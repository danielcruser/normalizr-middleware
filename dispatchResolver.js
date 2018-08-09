const defaultDispatchResolver = (store, normalizedData, map) => {
  const entities = Object.entries(normalizedData.entities);
  if (typeof map === 'object') {
    return entities.forEach(([entity, data]) =>
      store.dispatch({
        type: map[entity],
        payload: data
      })
    );
  } else if (typeof map === 'function') {
    return entities.foreEach(([entity, data]) =>
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
