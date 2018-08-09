import normalizrMiddleware from './normalizrMiddleware';
import configureNormalizrMiddleware from './configureNormalizrMiddleware';
import defaultDispatchResolver from './dispatchResolver';
import defaultNormalizrResolver from './normalizrResolver';
import { createActionResolverCase } from './utils';

const createDefaultOptions = ({
  actionResolver,
  schemaDispatchResolver,
  dispatchResolver = defaultDispatchResolver,
  normalizrResolver = defaultNormalizrResolver
}) => {
  return {
    schemas: {},
    active: action =>
      (actionResolver[action.type]
        ? !!actionResolver[action.type](action)
        : false),
    targets: {},
    resolve: (store, action) => {
      const normalizedData = normalizrResolver(action, actionResolver);
      dispatchResolver(store, normalizedData, schemaDispatchResolver);
    }
  };
};

export {
  normalizrMiddleware,
  configureNormalizrMiddleware,
  createDefaultOptions,
  createActionResolverCase
};
