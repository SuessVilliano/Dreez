import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {admin} from '@/lib/server';
import Backstage from './panel';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/backstage');if(!await admin())return <main className="admin"><a href="/" className="wordmark">dreez</a><h1>Backstage.</h1><p>This area is for Dreez and his team.</p><div className="admin-notice">Your signed-in account has not been granted management access. The site owner needs to add your sign-in email to the backstage allowlist.</div><a className="button" href="/">Back to the feeling</a></main>;return <Backstage/>}
