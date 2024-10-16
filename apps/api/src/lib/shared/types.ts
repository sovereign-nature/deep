import { UniqueNetwork } from '@sni/types';
import { Lucia, Session, User } from 'lucia';
import { z } from 'zod';
import { CrossmintResponseSchema } from './schemas';

export type AppContext = {
  Bindings: {
    //DB
    SESSIONS_DB: D1Database;

    WALLET_MNEMONIC: string;

    OPEN_SEA_API_KEY: string;
    ALCHEMY_API_KEY: string;

    CROSSMINT_API_URL: string;
    CROSSMINT_API_KEY: string;

    NFTSCAN_API_KEY: string;

    CLAIMS_SECRET: string;

    //Minting
    MINTING_QUEUE: Queue<string>;

    EMAILS_KV: KVNamespace;
    RESEND_API_KEY: string;

    //Dotphin
    DOTPHIN_PROOFS_COLLECTION_ID: string;
    DOTPHIN_COLLECTION_ID: number;
    DOTPHIN_NETWORK: UniqueNetwork;
  };
  Variables: {
    //Session variables
    user: User | null;
    session: Session | null;
    lucia: Lucia;
  };
};

export type CrossmintResponse = z.infer<typeof CrossmintResponseSchema>;
