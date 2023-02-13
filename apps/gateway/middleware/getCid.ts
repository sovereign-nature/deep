const getCid = (next) => (root, args, context, info) => {
  args.cid = args.cid.replace('ipfs://', '');
  console.log(args);
  return next(root, args, context, info);
};

export default getCid;
