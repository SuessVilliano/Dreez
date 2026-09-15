import {requireChatGPTUser} from '@/app/chatgpt-auth';
import {admin} from '@/lib/server';
import PromoPanel from './panel';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/backstage/promo');if(!await admin())return <main className="admin"><a href="/" className="wordmark">dreez</a><h1>Promo kit.</h1><p>This area is for Dreez and his team.</p><a className="button" href="/">Back home</a></main>;return <PromoPanel/>}
