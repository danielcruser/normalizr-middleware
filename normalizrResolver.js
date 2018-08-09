import { normalize } from 'normalizr';

const defaultNormalizrResolver = (action, actionResolver) => {
  const { slice, schema } = actionResolver[action.type](action);
  return normalize(slice(action), schema);
};

export default defaultNormalizrResolver;
