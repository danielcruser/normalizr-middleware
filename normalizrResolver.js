import { normalize } from 'normalizr';

const defaultNormalizrResolver = (action, actionResolver) => {
  /* here we should just return the result of actionResolver. We should make everything an array, even if length one,
  const data = slice(action)
  if (!data) {
    throw new Error(`You are trying to normalize undefined. You probably are selecting the wrong part of your action. Make sure that the path specified in ${slice} is correct`)
    } else {
      return normalize(slice(action), schema);
    }
    }
    then whatever accepts deaultnromalzirresolver needs to accept an array instaed of one object
  */
  const { slice, schema } = actionResolver[action.type](action);
  const data = slice(action)
  if (!data) {
    throw new Error(`You are trying to normalize undefined. You probably are selecting the wrong part of your action. Make sure that the path specified in ${slice} is correct`)
  } else {
    return normalize(slice(action), schema);
  }
};

export default defaultNormalizrResolver;
