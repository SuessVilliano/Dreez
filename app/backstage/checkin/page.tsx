import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {admin} from '@/lib/server';
import CheckinPanel from './panel';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/backstage/checkin');if(!await admin())return <main className="admin"><h1>Backstage access required.</h1><a className="button" href="/">Back home</a></main>;return <CheckinPanel/>}
