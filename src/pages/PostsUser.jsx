import { FlatList, Text, View } from "react-native"
import Post from "../components/Post"
import { useQuery } from "@apollo/client"
import { GET_POSTS } from "../queries/post"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"

export default function PostsUser({ type, id }) {
  const [posts, setPosts] = useState([])
  const { data, loading } = useQuery(GET_POSTS)
  useEffect(() => {
    if(data) {
      if(type === "My") {
        const myData = data.posts.filter(post => post.authorId === id)
        setPosts(myData)
      } else {
        setPosts(data.posts)
      }
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
        {posts.length > 0 ? <FlatList
          data={posts}
          renderItem={({item}) => <Post item={item}/>}
          keyExtractor={item => item._id}
        /> : <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'white',
            fontWeight: 'bold'
          }}>No Posts</Text>
        </View>}
      </View>
    </>
  )
}