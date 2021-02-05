import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectors as accountSelectors,
  actions as accountActions,
} from '../store'

export const AccountForm: React.FC = () => {
  const activeAccount = useSelector(accountSelectors.getActiveAccount())
  const allAccounts = useSelector(accountSelectors.getAccounts())
  const accountsList = Object.values(allAccounts)
  const [accountName, setAccountName] = React.useState<string>('')
  const dispatch = useDispatch()
  const form = useSelector(accountSelectors.getForm())

  const handleClick = () => {
    dispatch(accountActions.createRequest({ name: accountName }))
    setAccountName('')
  }

  return (
    <div>
      <h3>Account Info</h3>
      <p>Active Account: {activeAccount ? activeAccount.name : 'None'}</p>
      <p>All Accounts:</p>
      <ul>
        {accountsList.map((account) => (
          <li key={account.name}>{account.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Account Name"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
      <button onClick={handleClick}>Add Account</button>
      {form.error && <p style={{ color: 'red' }}>{form.error.message}</p>}
      {form.success && (
        <p style={{ color: 'green' }}>Successfully created account.</p>
      )}
    </div>
  )
}
