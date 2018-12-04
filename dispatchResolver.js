import { errors } from './utils'

const getActionType = (schemaResolver, entity, action) => {
  if (typeof schemaResolver === 'function') {
    return schemaResolver(entity, action)
  }
  else if (typeof schemaResolver === 'object') {
    if (typeof schemaResolver[entity] === 'string') {
      return schemaResolver[entity]
    } else if (typeof schemaResolver[entity] === 'function') {
      return schemaResolver[entity](action)
    }
  }
  console.error(errors.incorrectMapType())
}

const defaultDispatchResolver = (store, action, normalizedDataArray, schemaResolver) =>
  normalizedDataArray.map(normalizedData => {
    const entities = Object.entries(normalizedData.entities);
    if (!Array.isArray(entities)) {
      console.error(errors.dispatchResolverExpectsArray())
      return
    }
    return entities.forEach(([entity, data]) => {
      const actionType = getActionType(schemaResolver, entity, action)
      return actionType ? store.dispatch({
        type: actionType,
        payload: data
      }) : console.error(errors.noActionType())
    })
  })

export default defaultDispatchResolver;
