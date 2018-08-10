const createStalenessResolver = strategy => (state, action) => {
  if (Array.isArray(strategy[action.type])){
    return strategy[action.type].some(strat => strat(state))
  } else {
    return true
  }
}

export default createStalenessResolver
