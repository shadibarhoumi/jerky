import { createStore, applyMiddleware, combineReducers, Middleware, compose } from 'redux'
import { reducer as accountsReducer, KEY as ACCOUNTS_KEY, middleware as accountsMiddleware } from '../accounts'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function useStore(injectedMiddlewares?: Array<Middleware>) {
  let middleware = injectedMiddlewares || [accountsMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger')
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

  store.dispatch({ type: '@@INIT' } as any)
  return store
}
