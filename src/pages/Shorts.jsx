import { FlatList, View } from "react-native";
import Short from "../components/Short";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/post";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

export default function Shorts() {
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
        <FlatList 
          data={posts}
          renderItem={({item}) => <Short item={item}/>}
          keyExtractor={item => item._id}
        />
      </View>
    </>
  )
}