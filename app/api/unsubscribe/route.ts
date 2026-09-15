import {db,json,body,email,rate} from '@/lib/server';
export async function POST(req:Request){try{const b=await body(req);await rate(req,'unsubscribe');await db().prepare('DELETE FROM subscribers WHERE email = ?').bind(email(b.email)).run();return json({ok:true})}catch{return json({error:'Could not unsubscribe. Please try again.'},400)}}
