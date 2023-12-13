import { FlatList, View } from "react-native";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import { useQuery } from '@apollo/client'
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { GET_POSTS } from "../queries/post";

export default function Posts() {
  const [posts, setPosts] = useState([])
  const { data, loading } = useQuery(GET_POSTS)

  useEffect(() => {
    if(data) {
      setPosts(data.posts)
    }
  }, [data])

  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <View style={{
        backgroundColor: "#181818",
        flex: 1
      }}>
        <Navbar />
        <FlatList 
          data={posts}
          renderItem={({item}) => <Post item={item}/>}
          keyExtractor={item => item._id}
        />
      </View>
    </>
  )
}