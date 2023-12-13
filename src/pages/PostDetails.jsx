import { FlatList, Image, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { COMMENT_POST, GET_POST, GET_POSTS } from "../queries/post";
import { Ionicons } from '@expo/vector-icons';

export default function PostDetails({ route }) {
  const [input, setInput] = useState({
    content: ""
  })
  const [commentPost] = useMutation(COMMENT_POST, {
    refetchQueries: [
      GET_POSTS
    ]
  })

  const { _id } = route.params
  const { data, loading } = useQuery(GET_POST, {
    variables: { id: _id }
  })

  const [post, setPost] = useState({
    _id: "",
    comments: [],
    authorId: "",
    content: "",
    createdAt: "",
    imgUrl: "http",
    likes: [],
    tags: [],
    updatedAt: "",
    user: {}
  })

  useEffect(() => {
    if(data) {
      setPost(data.post)
    }
  }, [data])

  if(loading) {
    return (
      <Loading />
    )
  }

  async function handleComment() {
    try {
      if(!input.content) return
      await commentPost({
        variables: {
          "commentPost": {
            "content": input.content,
            "postId": post._id
          }
        }
      })
      setInput({content: ""})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={{
        backgroundColor: "#181818",
        flex: 1
      }}>
        <FlatList
          data={post.comments}
          renderItem={({ item }) => <Comment item={item} />}
          keyExtractor={item => item.createdAt}
          ListFooterComponent={
            <View style={{
              height: 5,
              backgroundColor: '#242424',
              marginStart: 20,
              marginEnd: 20,
              borderBottomStartRadius: 15,
              marginBottom: 20,
              borderBottomEndRadius: 15
            }} />
          }
          ListHeaderComponent={
            <>
              <Post item={post} />
              <View style={{
                marginStart: 20,
                marginEnd: 20,
                backgroundColor: '#242424',
                borderTopStartRadius: 15,
                borderTopEndRadius: 15,
              }}>
                <View style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  marginBottom: 12,
                  paddingTop: 15,
                  paddingStart: 15,
                  paddingEnd: 15
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: 'white'
                  }}>Comments</Text>
                  <Text style={{
                    color: 'grey'
                  }}>{post.comments.length}</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  gap: 15,
                  paddingStart: 15,
                  paddingEnd: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey'
                }}>
                  <Image 
                    source={{ uri: 'https://i.pinimg.com/originals/61/be/2a/61be2af0cfd55adee0d0216a095c515d.jpg' }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18
                    }}
                  />
                  <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <TextInput placeholder="Add comment..." placeholderTextColor="grey" style={{
                      color: 'white',
                      flex: 1
                    }} onChangeText={(text) => {
                      setInput({
                        content: text
                      })
                    }}
                    value={input.content}/>
                    <TouchableWithoutFeedback onPress={handleComment}>
                      <Ionicons name="ios-send" size={18} color="white" style={{
                        marginEnd: 10,
                        marginStart: 20
                      }}/>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </>
          }
        />
      </View>
    </>
  )
}