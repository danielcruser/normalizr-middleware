export const errors = {
  actionResolverShouldReturnArray: () => `The default normalizrResolver expects to find an array on the actionResolver, even if it is only of length one.`,
  dispatchResolverExpectsArray: () => 'The default dispatchResolver expects each entry of the normalizedData array to have an entities array created by normalizr',
  incorrectActiveParamType: () => `parameter "active" must be an object or function`,
  incorrectMapType: () => 'map must be an object or function',
  payloadSelector: selector => `You are trying to normalize undefined. You probably are selecting the wrong part of your action. Make sure that the path specified in ${selector} is correct`,
  noActionType: () => `The action has no type. You probably forgot to resolve the mapping between normalized data and a new action type. This usually happens when there is data that can be unexpectedly normalized. Make sure all of your schemas are accounted for in your schemaToActionTypeResolver.`,
}
