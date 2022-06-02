import React from 'react'
import { View, StatusBar } from 'react-native'

import Home from './src/pages/home'

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#232630" barStyle="light-content" />
      <Home />
    </>
  )
}
