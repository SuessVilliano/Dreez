import {body,clean,db,email,json,rate} from '@/lib/server';

const defaultQuestion='What should Dreezz make next?';
const defaultOptions=['Rooftop sunset set','Deep after-hours set','R&B × house blend','Fan-voted mix'];

async function config(){
 const rows=await db().prepare("SELECT key,value FROM settings WHERE key IN ('pollQuestion','pollOptions','blendUrl')").all<{key:string,value:string}>();
 const settings=Object.fromEntries(rows.results.map(row=>[row.key,row.value]));
 const options=(settings.pollOptions||'').split('\n').map((value:string)=>value.trim()).filter(Boolean).slice(0,6);
 return {question:settings.pollQuestion||defaultQuestion,options:options.length>=2?options:defaultOptions,blendUrl:settings.blendUrl||''};
}

export async function GET(){
 try{
  const poll=await config();
  const votes=await db().prepare("SELECT payload FROM fan_actions WHERE type = 'vote'").all<{payload:string}>();
  const counts=Object.fromEntries(poll.options.map(option=>[option,0]));
  for(const row of votes.results){try{const value=JSON.parse(row.payload)?.option;if(typeof counts[value]==='number')counts[value]++}catch{}}
  return json({poll:{question:poll.question,options:poll.options,counts,total:Object.values(counts).reduce((sum:number,value:any)=>sum+Number(value),0)},blendUrl:poll.blendUrl});
 }catch(e){
  console.error('Fan lab storage unavailable; serving default public poll',e);
  const counts=Object.fromEntries(defaultOptions.map(option=>[option,0]));
  return json({poll:{question:defaultQuestion,options:defaultOptions,counts,total:0},blendUrl:'',degraded:true});
 }
}

export async function POST(req:Request){
 try{
  await rate(req,'fan-action');
  const b=await body(req);const type=clean(b.type,20);const name=clean(b.name,100);const now=new Date().toISOString();let address='';let payload:any={};
  if(type==='vote'){
   const poll=await config();const option=clean(b.option,120);if(!poll.options.includes(option))return json({error:'Choose one of the current poll options.'},400);payload={option};
  }else if(type==='song'){
   const track=clean(b.track,160),artist=clean(b.artist,160),note=clean(b.note,800);if(!track)return json({error:'Tell Dreezz what track you want to hear.'},400);address=b.email?email(b.email):'';payload={track,artist,note};
  }else if(type==='blend'){
   address=email(b.email);const vibe=clean(b.vibe,500),occasion=clean(b.occasion,160),references=clean(b.references,800),length=clean(b.length,80),due=clean(b.due,40),budget=clean(b.budget,80);if(!vibe)return json({error:'Describe the vibe you want for the custom blend.'},400);payload={vibe,occasion,references,length,due,budget};
  }else return json({error:'Unknown Fan Lab action.'},400);
  await db().prepare('INSERT INTO fan_actions (id,type,name,email,payload,created) VALUES (?,?,?,?,?,?)').bind(crypto.randomUUID(),type,name,address,JSON.stringify(payload),now).run();
  if(b.join==='on'&&address)await db().prepare('INSERT INTO subscribers (email,name,source,created) VALUES (?,?,?,?) ON CONFLICT(email) DO NOTHING').bind(address,name,'fan-lab',now).run();
  return json({ok:true});
 }catch(e){console.error('Fan action failed',e);return json({error:e instanceof Error?e.message:'Could not send that right now.'},400)}
}
