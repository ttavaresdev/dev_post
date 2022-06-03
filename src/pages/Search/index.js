import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Search() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pagina de procura!!</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232630'
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 25
  }
})