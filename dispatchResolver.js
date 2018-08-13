const defaultDispatchResolver = (store, action, normalizedDataArray, map) => {
  return normalizedDataArray.map(normalizedData => {
    const entities = Object.entries(normalizedData.entities);
    if (typeof map === 'object') {
      return entities.forEach(([entity, data]) => {
        let type
        if (typeof map[entity] === 'string') {
          type = map[entity]
        } else if (typeof map[entity] === 'function') {
          type = map[entity](action)
        }
        store.dispatch({
          type,
          payload: data
        })
      }
      );
    } else if (typeof map === 'function') {
      return entities.forEach(([entity, data]) =>
        store.dispatch({
          type: map(entity, action),
          payload: data
        })
      );
    } else {
      throw new Error('map must be an object or function');
    }
    })
};

export default defaultDispatchResolver;
