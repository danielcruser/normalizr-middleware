## normalizr-middlware

Normalizr-middleware leverages the power of [normalizr](https://github.com/paularmstrong/normalizr) and the redux middleware pattern to transform nested api responses into flat data that can be dispatched to the appropiate reducers.

### Inspiration
  - [Normalizing State Shape](https://redux.js.org/recipes/structuringreducers/normalizingstateshape) from the Redux documentation demonstrates the benefits of storing data grouped by 'type' and keyed by some unique identifier (almost always id).
  - Many API's do not return data in this format. The normalizr [Redux Example](https://github.com/paularmstrong/normalizr/tree/master/examples/redux) shows one solution for transforming an API response into data ready to be consumed by reducers.

### Purpose
By moving the normalization to a middleware, we can accomplish several things:
1. We can centralize our normalizr configurations for different api responses, making it easier to maintain/track where normalization is occuring. This results in less context switching and more pattern recognition.

2. We can more easily customize how this data is dispatched. For example, the [Redux Example](https://github.com/paularmstrong/normalizr/tree/master/examples/redux) normalizes a response and sends the same action to all reducers. Leaving it up to the reducer to decide how to merge data. With middleware we can dispatch actions on a per entity basis with a standardized payload. This means, for example, a todo reducer will only see todos from the api (with users referenced by id), and a users reducer will only see users from the api (and todos referenced by id) if we want.

3. In addition to splitting API responses to separate concerns, we can merge the results of similar normalized API responses into actions to reduce boilerplate. For example, a response containing all todos and a response containing todos for a specific user can both resolve to the same action, reducing boilerplate and adding consistency to our reducers.

5. At least with the structure of the default options, it is easier to develop helpful error messages to point out common mistakes.

6. After the initial setup is complete, the LOC to add new normalized actions is extremely low.

7. In development mode, the middleware can (hopefully eventually) be configured to listen for actions that have normalizable payloads according to existing schema, identifying low effort high reward efforts.


### Getting Started
If the default options are used, the following two things must be supplied by the user:
1. `actionResolver`: A strategy to parse incoming actions into normalized data
2. `schemaDispatchResolver`: A strategy to dispatch the normalized data from `actionResolver`. The `defaultDispatchResolver` in `defaultOptions` maps to the `schemaDispatchResolver` by key lookup passing as a paremeter. It expects to resolve to an action type.
  - Note: By default, an action is `active` if an actionResolver strategy exists for that action.

If the default options are not used, the user must provide an options object with:
1. An `active` property used to determine which actions to listen to. Can be an `object`, `array` (not recommended), or `function`. If an `object` or `array`, it will check for truthiness of `action.type`. If a `function`, it will pass it the entire action, to allow the user to determine resolution.
2. A `resolve` property - a function which accepts `store` and `action` which determines how to deal with those actions. (resolve does the work of both actionResolver and schemaDispatchResolver)

-----

### API
```
```
`configureNormalizrMiddleware`

```
(middleWare, options) => configuredMiddleWare

```
`createDefaultOptions`:
```
({
  actionResolver,
  schemaDispatchResolver,
  dispatchResolver = defaultDispatchResolver,
  normalizrResolver = defaultNormalizrResolver
}) => options // ({ resolve, active })
```
`createActionResolverCase`: A utility function that preps data for consumption by defaultNormalizrResolver.
```
(slice, schema) => ({ slice, schema})
```
-----
### Example

First we create our normalizr schemas.

`schemas.js`
```
import { schema } from 'normalizr
export const user = new schema.Entity('users');

export const teamMember = new schema.Entity('teamMembers', {
  user: user
});

export const team = new schema.Entity('teams', {
  team_members: [teamMember],
  coach: user
});
```
Then, we create our resolver strategies. We get the same benefits from using selectors with our action payloads as we would with our store.

`resolvers.js`
```
import * as constants from 'path/to/consants/normalizrConstants';
import { createActionResolverCase } from 'normalizr-middleware';
import { user, team, teamMember } from '../schemas';

export const schemaDispatchResolver = {
  users: constants.RESOLVED_USERS,
  teams: constants.RESOLVED_TEAMS,
  teamMembers: constants.RESOLVED_TEAM_MEMBERS
};

const selectFetchTeamsSuccess = action => action.payload.response.teams;

export const actionResolver = {
  FETCH_TEAMS_SUCCESS: () =>
    createActionResolverCase(selectFetchTeamsSuccess, [team])
};

```
It is recommened to configure the middleware in a separate file before importing into your redux createStore file.

`configureNormalizrMiddleware.js`
```
import {
  createDefaultOptions,
  normalizrMiddleware,
  configureNormalizrMiddleware
} from 'normalizr-middleware';

import { schemaDispatchResolver, actionResolver } from './resolvers'; // must be configured by you

const configuredNormalizrMiddleware = configureNormalizrMiddleware(
  normalizrMiddleware,
  createDefaultOptions({
    actionResolver,
    schemaDispatchResolver
  })
);

export default configuredNormalizrMiddleware;
```

This transforms `FETCH_TEAMS_SUCCESS`, a nested response into three, separate actions that only contain the data their reducers care about. `FETCH_TEAMS_SUCCESS` will still pass through in case other reducers need to pull data off of it.

In order to listen to another API response, we only need to
1. (maybe) add a schema,
2. map it to a constant
3. add a selector,
4. add an `actionResolver` case.



-----
### Advanced
  - more to come
### Advanced Example
  - more to come

### Development Mode


### Roadmap
