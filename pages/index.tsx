import React from 'react'
import Head from 'next/head'
import { AccountForm } from '@j/accounts/components/AccountForm'

export const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Jerky</title>
      </Head>
      <p>This is a new way to remember things.</p>
      <AccountForm />
    </>
  )
}

export default HomePage
