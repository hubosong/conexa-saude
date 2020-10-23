import React from 'react'
import Routes from './src/Routes'
import { StatusBar } from 'react-native'

import { Provider } from 'react-redux'
import { Store } from './src/stores/Store'

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor='transparent' />
      <Provider store={Store}>
        <Routes />
      </Provider>
    </>
  )
}