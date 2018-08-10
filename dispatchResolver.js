const defaultDispatchResolver = (store, normalizedData, map) => {
  /* need to convert this to expect normalizedData as an array even if length 1
  then we can map over it and dispatch */
  const entities = Object.entries(normalizedData.entities);
  if (typeof map === 'object') {
    return entities.forEach(([entity, data]) =>
      store.dispatch({
        type: map[entity],
        payload: data
      })
    );
  } else if (typeof map === 'function') {
    return entities.forEach(([entity, data]) =>
      store.dispatch({
        type: map(entity),
        payload: data
      })
    );
  } else {
    throw new Error('map must be an object or function');
  }
};

export default defaultDispatchResolver;
