import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import '../styles/globals.css'
import useStore from 'frontend/store'

const store = useStore()

export default function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
