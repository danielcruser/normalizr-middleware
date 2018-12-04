import { normalize } from 'normalizr';
import { errors } from './utils'

const defaultNormalizrResolver = (action, actionResolver) => {
  const strategies = actionResolver[action.type]()
  if (!Array.isArray(strategies)){
    console.error(errors.actionResolverShouldReturnArray())
    return []
  }
  const normalizedDataArray = strategies.map(([selector, schema]) => {
    const data = selector(action)
    if (!data) {
      throw new Error(errors.payloadSelector(selector))
      } else {
        return normalize(data, schema);
      }
  })
  return normalizedDataArray
};

export default defaultNormalizrResolver;
