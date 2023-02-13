const getCid = (next) => (root, args, context, info) => {
  args.cid = args.cid.replace('ipfs://', '');

  return next(root, args, context, info);
};

export default getCid;
