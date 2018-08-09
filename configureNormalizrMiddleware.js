const configureNormalizrMiddleware = (
  middleWare,
  { schemas, active, targets, resolve }
) => {
  /* configure middleWare here



  */

  return middleWare({
    schemas,
    active,
    targets,
    resolve
  });
};

export default configureNormalizrMiddleware;
