import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

import CategoryItem from '../../components/CategoryItem'
import { getFavorite, setFavorite } from '../../services/favorite'
import FavoritePost from '../../components/FavoritePost'
import PostItem from '../../components/PostItem'

export default function Home() {
  const navigation = useNavigation()
  const [categories, setCategories] = useState([])
  const [favCategory, setFavCategory] = useState([])

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadData() {
      await getListPosts()

      const category = await api.get('/api/categories?populate=icon')
      setCategories(category.data.data)
    }
    loadData()
  }, [])

  useEffect(() => {
    async function favorite() {
      const response = await getFavorite()
      setFavCategory(response)
    }
    favorite()
  }, [])
  async function getListPosts() {
    const response = await api.get(
      'api/posts?populate=cover&sort=createdAt:desc'
    )
    setPosts(response.data.data)
  }
  // Favoritando uma categoria
  async function handleFavorite(id) {
    const response = await setFavorite(id)
    setFavCategory(response)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}> DevBlog</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Feather name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingRight: 12 }}
        style={styles.categories}
        data={categories}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />

      <View style={styles.main}>
        {favCategory.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{ paddingEnd: 25 }}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}

        <Text
          style={[
            styles.title,
            { marginTop: favCategory.length > 0 ? 14 : 35 }
          ]}
        >
          Conteúdo em Alta</Text>

        <FlatList
          style={{ flex: 1, paddingHorizontal: 18 }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PostItem data={item}/>}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232630'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 18
  },
  name: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold'
  },
  categories: {
    maxHeight: 115,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9
  },
  main: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: -30,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 14,
    fontFamily: 'Roboto',
    paddingHorizontal: 18,
    color: '#162133'
  }
})
