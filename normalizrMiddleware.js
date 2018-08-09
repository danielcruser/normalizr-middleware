const normalizrMiddleware = config => store => next => action => {
  const { type, payload } = action;
  const { active, targets, schemas, resolve } = config;
  let match;
  if (!action.type){
    console.log(action)
    throw new Error(`The action has no type. You probable forgot to resolve the mapping between normalized data and a new action type.`)
    return next(action)
  }
  if (action.type.startsWith('RESOLVED')) {
    // console.log('we made it')

    return next(action);
  }
  if (typeof active === 'object') {
    match = active[type];
  } else if (typeof active === 'array') {
    match = active.find(active[type]);
  } else if (typeof active === 'function') {
    match = active(action);
  } else {
    throw new Error('parameter "active" must be an object, array, or function');
  }
  if (match) {
    resolve(store, action);
  }

  if (process.env.NODE_ENV === 'development') {
    // do target identifying stuff here
    if (targets[type]) {
      // console.log('we can normalize this for free');
    }
  }

  return next(action);
};

export default normalizrMiddleware;
