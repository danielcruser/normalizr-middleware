import { errors } from './utils'

const noActionTypeErrorChecker = (action, config) => {
  if (!action.type && process.env.NODE_ENV === 'development' && config.defaultConfig){
    throw new Error(errors.noActionType())
  }
}
const typeofActiveChecker = (active, action) => {
  if (typeof active === 'object') {
    return active[action.type];
  } else if (typeof active === 'function') {
    return active(action);
  } else if (process.env.NODE_ENV === 'development'){
    throw new Error(errors.incorrectActiveParamType());
  }
}

const identifyNormalizations = (targets, action) => {
  if (process.env.NODE_ENV === 'development' && process.env.IDENTIFY_NORMALIZATIONS) {
    // do target identifying stuff here
    if (targets[action.type]) {
      // we can normalize this with our existing schemas;
    }
  }
}

const normalizrMiddleware = config => store => next => action => {
  next(action)
  const { type } = action;
  const { active, targets, resolve, ignore } = config;
  if (ignore(action)) {
    return
  }
  noActionTypeErrorChecker(action, config)
  const match = typeofActiveChecker(active, type)
  if (match) {
    resolve(store, action);
  }
  identifyNormalizations(targets, action)
};

export default normalizrMiddleware;
