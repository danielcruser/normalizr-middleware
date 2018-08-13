const normalizrMiddleware = config => store => next => action => {
  const { type, payload } = action;
  const { active, targets, resolve } = config;
  let match;
  if (!action.type && process.env.NODE_ENV === 'development' && config.defaultConfig){
    throw new Error(`The action has no type. You probably forgot to resolve the mapping between normalized data and a new action type. This usually happens when there is data that can be unexpectedly normalized. Make sure all of your schemas are accounted for in your schemaToActionTypeResolver.`)
  }
  if (action.type.startsWith('RESOLVED')) {
    return next(action);
  }

  if (typeof active === 'object') {
    match = active[type];
  } else if (typeof active === 'array') {
    match = active.find(active[type]);
  } else if (typeof active === 'function') {
    match = active(action);
  } else if (process.env.NODE_ENV === 'development'){
    throw new Error('parameter "active" must be an object, array, or function');
  }
  if (match) {
    resolve(store, action);
  }

  if (process.env.NODE_ENV === 'development') {
    // do target identifying stuff here
    if (targets[type]) {
      // 'we can normalize this with our existing schemas;
    }
  }

  return next(action);
};

export default normalizrMiddleware;
