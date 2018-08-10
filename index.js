import normalizrMiddleware from './normalizrMiddleware';
import configureNormalizrMiddleware from './configureNormalizrMiddleware';
import defaultDispatchResolver from './dispatchResolver';
import defaultNormalizrResolver from './normalizrResolver';
import createStalenessResolver from './stalenessResolver'
import { createActionResolverCase } from './utils';

const defaultStalenessResolver = () => true

const createDefaultOptions = ({
  actionResolver,
  schemaToActionTypeResolver,
  stalenessResolver = defaultStalenessResolver,
  dispatchResolver = defaultDispatchResolver,
  normalizrResolver = defaultNormalizrResolver,
  defaultConfig = true
}) => {
  return {
    active: action =>
      (actionResolver[action.type]
        ? !!actionResolver[action.type](action)
        : false),
    targets: {},
    resolve: (store, action) => {
      const shouldNormalize = stalenessResolver(store.getState(), action)
      if (shouldNormalize){
        const normalizedData = normalizrResolver(action, actionResolver);
        dispatchResolver(store, normalizedData, schemaToActionTypeResolver);
      }
    }
  };
};

export {
  normalizrMiddleware,
  configureNormalizrMiddleware,
  createDefaultOptions,
  createActionResolverCase,
  createStalenessResolver
};
