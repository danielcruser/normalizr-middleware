import { normalize } from 'normalizr';

const defaultNormalizrResolver = (action, actionResolver) => {
  const { slice, schema } = actionResolver[action.type](action);
  const data = slice(action)
  if (!data) {
    throw new Error(`You are trying to normalize undefined. You probably are selecting the wrong part of your action. Make sure that the path specified in ${slice} is correct`)
  } else {
    return normalize(slice(action), schema);
  }
};

export default defaultNormalizrResolver;
