import { Hono } from 'hono';
import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import { createAssetDID } from '@sni/address-utils';

const app = new Hono();

async function getUsedProofs(address: string) {
  const result = await fetch(
    `https://rest.unique.network/unique/v1/tokens/account-tokens?address=${address}&collectionId=665`
  );
  const data = AccountTokensResponseSchema.parse(await result.json());
  const total = data.tokens.length;

  return {
    total,
    used: total, //TODO: Get used from proofsCollection
  };
}

async function getDotphinAddress(address: string) {
  const network = 'unique';
  const collectionId = 664;

  const result = await fetch(
    `https://rest.unique.network/${network}/v1/tokens/account-tokens?address=${address}&collectionId=${collectionId}`
  );
  const data = AccountTokensResponseSchema.parse(await result.json());

  const dotphin = data.tokens[0];

  if (!dotphin) {
    return null;
  }

  return createAssetDID(network, 'unique2', collectionId, dotphin.tokenId);
}

app.get('/:address', async (c) => {
  const address = c.req.param('address');

  const proofs = await getUsedProofs(address);

  const dotphinDID = await getDotphinAddress(address);

  return c.json({ address, proofs, dotphinDID });
});

//TODO: Replace with wallet call?
app.get('/:address/proofs', (c) => {
  const address = c.req.param('address');

  //TODO: Return proofs or available proofs with url param
  return c.json({ address });
});

//TODO: Discuss with Maija, maybe get with redirect?
app.post('/claim', (c) => {
  //TODO: Claim a DOTphin for a certain address and proof DID
  return c.json({ message: 'Claimed' });
});

export default app;
