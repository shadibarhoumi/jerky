import { Account } from '@j-backend/accounts'

import type { Reducer } from 'redux'

export const KEY = 'accounts'

export const actionTypes = {
  CREATE_REQUEST: 'accounts/CREATE_REQUEST' as `accounts/CREATE_REQUEST`,
  CREATE_SUCCESS: 'accounts/CREATE_SUCCESS' as `accounts/CREATE_SUCCESS`,
  CREATE_FAILURE: 'accounts/CREATE_FAILURE' as `accounts/CREATE_FAILURE`,
  SET_ACTIVE: 'accounts/SET_ACTIVE' as `accounts/SET_ACTIVE`,
}

interface CreateRequestAction {
  type: typeof actionTypes.CREATE_REQUEST
  name: string
}

interface CreateSuccessAction {
  type: typeof actionTypes.CREATE_SUCCESS
  account: Account
}

interface CreateFailureAction {
  type: typeof actionTypes.CREATE_FAILURE
  error: Error
}

interface SetActiveAction {
  type: typeof actionTypes.SET_ACTIVE
  account: Account
}

type Payload<Action> = Omit<Action, 'type'>

export const actions = {
  createRequest: ({
    name,
  }: Payload<CreateRequestAction>): CreateRequestAction => ({
    type: actionTypes.CREATE_REQUEST,
    name,
  }),
  createSuccess: ({
    account,
  }: Payload<CreateSuccessAction>): CreateSuccessAction => ({
    type: actionTypes.CREATE_SUCCESS,
    account,
  }),
  createFailure: ({
    error,
  }: Payload<CreateFailureAction>): CreateFailureAction => ({
    type: actionTypes.CREATE_FAILURE,
    error,
  }),
  setActive: ({ account }: Payload<SetActiveAction>): SetActiveAction => ({
    type: actionTypes.SET_ACTIVE,
    account,
  }),
}

export type actions = ReturnType<typeof actions[keyof typeof actions]>
interface StateSlice {
  activeAccountId: Account['id']
  byId: Record<Account['id'], Account>
  form: {
    loading: boolean
    success: boolean
    error?: Error
  }
}

const initialState: StateSlice = {
  activeAccountId: '',
  byId: {},
  form: {
    loading: false,
    success: false,
  },
}

export const reducer: Reducer<StateSlice, actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.CREATE_SUCCESS:
    case actionTypes.SET_ACTIVE:
      return {
        ...state,
        activeAccountId: action.account.id,
        byId: {
          ...state.byId,
          [action.account.id]: action.account,
        },
        form: {
          loading: false,
          success: true,
        },
      }

    case actionTypes.CREATE_FAILURE:
      return {
        ...state,
        form: {
          loading: false,
          success: false,
          error: action.error,
        },
      }

    default:
      return state
  }
}

type State = Record<typeof KEY, StateSlice>

export const selectors = {
  getAccounts: () => (state: State): Record<string, Account> => state[KEY].byId,
  getAccountById: (id: Account['id']) => (state: State): Account =>
    state[KEY].byId[id],
  getActiveAccountId: () => (state: State): Account['id'] =>
    state[KEY].activeAccountId,
  getActiveAccount: () => (state: State): Account => {
    const activeAccountId = state[KEY].activeAccountId
    const accounts = state[KEY].byId
    return accounts[activeAccountId]
  },
  getForm: () => (state: State): StateSlice['form'] => state[KEY].form,
}
