import {
  createStore,
  applyMiddleware,
  combineReducers,
  Middleware,
} from 'redux'
import {
  reducer as accountsReducer,
  KEY as ACCOUNTS_KEY,
  middleware as accountsMiddleware,
} from '../accounts'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useStore(injectedMiddlewares?: Array<Middleware>) {
  let middleware = injectedMiddlewares || [accountsMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger({
      level: 'info',
      collapsed: true,
    })
    middleware = [...middleware, loggerMiddleware]
  }

  const store = createStore(
    combineReducers({
      [ACCOUNTS_KEY]: accountsReducer,
    }),
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
  )

  return store
}
