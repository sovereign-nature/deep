import { Context } from 'hono';
import { setCookie } from 'hono/cookie';

import { DeepAsset } from '@sni/types';
import { logger } from '$lib/logger';
import { AppContext } from '$lib/shared/types';
import { getProof } from '$lib/db/proofs';

export async function validateUser(address: string, c: Context<AppContext>) {
  const user = c.get('user');

  //Check if user logged in and have the rights to claim
  if (!user) {
    logger.error('User is not logged in');

    return c.json({ error: true, message: 'User is not logged in' }, 401);
  }

  if (user.id.toLowerCase() !== address.toLowerCase()) {
    logger.error(
      `User address and claim address does not match.  UserID: ${user.id.toLowerCase()} Claim Address: ${address.toLowerCase()}`
    );

    //Cookies cleanup hack, so users are not connecting with broken or wrong session
    const session = c.get('session');

    const lucia = c.get('lucia');

    //Invalidate the session
    if (session) {
      logger.info(`Removing the session ${session.id}`);

      await lucia.invalidateSession(session.id);
      logger.info('Session invalidated', { session });
    }

    //Invalidate all user sessions (just in case)
    await lucia.invalidateUserSessions(user.id);

    //Remove the cookie
    const blankCookie = lucia.createBlankSessionCookie();
    setCookie(c, blankCookie.name, blankCookie.value, blankCookie.attributes);

    return c.json(
      {
        error: true,
        message: 'User address and claim address does not match',
      },
      400
    );
  }
}

export async function validateProof(
  proofAsset: DeepAsset,
  address: string,
  c: Context<AppContext>
) {
  const { DOTPHIN_PROOFS_COLLECTION_ID, SESSIONS_DB } = c.env;

  //Check if proof is from the DOTphin collection
  if (proofAsset.collection.id !== DOTPHIN_PROOFS_COLLECTION_ID.toString()) {
    logger.error('Proof is not from the DOTphin collection');

    return c.json(
      {
        error: true,
        message: 'Proof is not from the DOTphin collection',
      },
      400
    );
  }

  //Checking if proof owner is the same as the user
  if (proofAsset.owner.toLowerCase() !== address.toLowerCase()) {
    logger.error('Proof owner and claim address does not match');

    return c.json(
      {
        error: true,
        message: 'Proof owner and claim address does not match',
      },
      400
    );
  }

  //Check if proof is not used
  const proofCache = await getProof(SESSIONS_DB, proofAsset.address);

  if (proofCache !== null) {
    const { used } = proofCache;

    if (used) {
      logger.error('Proof is already used');

      return c.json({ error: true, message: 'Proof is already used' }, 400);
    }
  }
}
