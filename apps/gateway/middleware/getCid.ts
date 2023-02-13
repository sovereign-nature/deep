const getCid = (next) => (root, args, context, info) => {
  console.log('Middleware executed');
  // console.log('Args: ', args);
  // console.log('ROOT:', root);
  // // console.log('CONTEXT:', context);
  // console.log('INFO', info);

  // args.cid = args.cid.replace('ipfs://', '');
  return next(root, args, context, info);
};

export default getCid;
