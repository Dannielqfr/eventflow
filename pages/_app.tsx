import '@/styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { STORE } from '@/features/store'
import { Provider } from 'react-redux'
import { actionPeople } from '@/features/peopleSlice'
import { actionUsers } from '@/features/usersSlice'
import { StyleSheetManager } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    STORE.dispatch(actionUsers.validate())
  }, [])

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'responsive'}>

    <Provider store={STORE}>
      <Component {...pageProps} />
    </Provider>
    </StyleSheetManager>
  )
}
