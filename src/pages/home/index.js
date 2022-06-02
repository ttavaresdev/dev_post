import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page!!</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212'
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 25
  }
})
