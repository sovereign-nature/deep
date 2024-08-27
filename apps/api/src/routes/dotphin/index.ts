import { Hono } from 'hono';

const app = new Hono();

app.get('/:address', (c) => {
  const address = c.req.param('address');
  //TODO: GET proofs amount from proofsCollection - number, used
  //TODO: GET dotphin from dotphinCollection

  return c.json({ address });
});

//TODO: Replace with wallet call?
app.get('/:address/proofs', (c) => {
  const address = c.req.param('address');

  //TODO: Return proofs or available proofs with url param
  return c.json({ address });
});

app.post('/claim', (c) => {
  //TODO: Claim a DOTphin for a certain address and proof
  return c.json({ message: 'Claimed' });
});

export default app;
