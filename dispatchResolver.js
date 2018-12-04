import { errors } from './utils'

const getActionType = (map, entity, action) => {
  if (typeof map === 'function') {
    return map(entity, action)
  }
  else if (typeof map === 'object') {
    if (typeof map[entity] === 'string') {
      return map[entity]
    } else if (typeof map[entity] === 'function') {
      return map[entity](action)
    }
  }
  console.error(errors.incorrectMapType())
}

const defaultDispatchResolver = (store, action, normalizedDataArray, map) =>
  normalizedDataArray.map(normalizedData => {
    const entities = Object.entries(normalizedData.entities);
    if (!Array.isArray(entities)) {
      console.error(errors.dispatchResolverExpectsArray())
      return
    }
    return entities.forEach(([entity, data]) => {
      const actionType = getActionType(map, entity, action)
      return actionType ? store.dispatch({
        type: actionType,
        payload: data
      }) : console.error(errors.noActionType())
    })
  })

export default defaultDispatchResolver;
