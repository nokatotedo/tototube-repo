import { FlatList, Text, View } from "react-native";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PhotoUser from "../components/PhotoUser";
import { GET_POSTS } from "../queries/post";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { GET_USER } from "../queries/user";

export default function PostsSubscription() {
  const [posts, setPosts] = useState([])
  const [followings, setFollowings] = useState([])
  const { data: dataPosts , loading: loadingPosts } = useQuery(GET_POSTS)
  const { data: dataUser, loading: loadingUser } = useQuery(GET_USER, {
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if(dataUser) {
      setFollowings(dataUser.user.followings)
      if(dataPosts) {
        const subscriptionPosts = dataPosts.posts.filter(post => {
          let same = false
          dataUser.user.followings.forEach(following => {
            if(post.authorId === following.user._id) {
              same = true
            }
          })

          if(same) return post
        }) 

        setPosts(subscriptionPosts)
      }
    }
  }, [dataPosts, dataUser])

  useEffect(() => {
    if(dataUser) {
      setFollowings(dataUser.user.followings)
    }
  }, [dataUser])

  if(loadingPosts || loadingUser) {
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
        {followings.length > 0 && <View>
          <FlatList 
            data={followings}
            renderItem={({item}) => <PhotoUser item={item}/>}
            keyExtractor={item => item._id}
            horizontal={true}
          />
        </View>}
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
          }}>No Subscription</Text>
        </View>}
      </View>
    </>
  )
}