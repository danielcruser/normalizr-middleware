const configureNormalizrMiddleware = (
  middleWare,
  { schemas, active, targets, resolve, ignore }
) => {
  /* configure middleWare here


  */

  return middleWare({
    schemas,
    active,
    targets,
    resolve,
    ignore
  });
};

export default configureNormalizrMiddleware;
