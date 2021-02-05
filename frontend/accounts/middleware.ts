import { Middleware } from 'redux'
import {
  actions as accountActions,
  actionTypes as accountActionTypes,
} from './store'

const generateId = () => Math.random().toString(36).slice(2)

export const middleware: Middleware = ({ dispatch }) => {
  return (next) => (action: accountActions) => {
    next(action)

    switch (action.type) {
      case accountActionTypes.CREATE_REQUEST:
        if (action.name.trim()) {
          dispatch(
            accountActions.createSuccess({
              account: { name: action.name, id: generateId() },
            }),
          )
        } else {
          dispatch(
            accountActions.createFailure({
              error: new Error('Account name cannot be empty.'),
            }),
          )
        }
    }
  }
}
