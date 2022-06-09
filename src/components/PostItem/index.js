import { NavigationHelpersContext } from '@react-navigation/native'
import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({data}){
  const navigation = useNavigation();
  function handleDetail(){
   navigation.navigate ("Detail", {id: data.id});
  }

  return(
    <TouchableOpacity
    onPress={handleDetail}
    style={styles.container}
    >
      <View style={styles.header}>
        
        <Image
        style={styles.cover}
        source={{ uri: `http://192.168.2.119:1337${data?.attributes?.cover?.data?.attributes?.url}` }}
        />

      </View>
      <View style={styles.body}>
        
        <Text style={styles.title} >
        {data.attributes.title}
        </Text>

        <Text style={styles.description} numberOfLines={3}>
          {data.attributes.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 4,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection:'row'


  },
  header:{
    marginHorizontal: 8
  },
  cover:{
    width: 90,
    height: 90,
    borderRadius: 4,
    
  },
  body:{
    width:'70%',
  },
  title:{
    fontWeight:'bold',
    fontSize: 14,
    marginBottom: 4
  },
  description:{
    fontSize: 12,
    lineHeight: 16
  }
})