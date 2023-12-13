import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_POSTS, LIKE_POST } from "../queries/post";

export default function Short({ item }) {
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation()
  const [isLike, setIsLike] = useState(false)
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [
      GET_POSTS
    ]
  })

  async function handleLike() {
    try {
      await likePost({
        variables: {
          "likePost": {
            "postId": item._id
          }
        }
      })
      setIsLike(true)
    } catch (error) {
      if(error.message === "Already Like") {
        setIsLike(true)
      }
    }
  }

  return (
    <>
      <View style={{
        backgroundColor: "#181818",
        height: windowHeight - 60,
        position: "relative"
      }}>
        <Image 
          source={{
            uri: item.imgUrl
          }}
          style={{
            height: "100%"
          }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{
            height: windowHeight - 60,
            width: '100%',
            position: 'absolute',
            zIndex: 1
          }}
        />
        <View style={{
          position: 'absolute',
          zIndex: 2,
          width: "100%",
          top: 0,
          left: 0,
          height: "100%",
          justifyContent: 'flex-end',
          padding: 20
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              justifyContent: 'flex-end',
              flex: 1
            }}>
              <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('User', {
                  _id: item.authorId,
                  type: "search"
                })
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10
                }}>
                  <Image 
                    source={{
                      uri: 'https://i.pinimg.com/originals/61/be/2a/61be2af0cfd55adee0d0216a095c515d.jpg'
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25
                    }}
                  />
                  <Text style={{
                    color: 'white',
                    fontWeight: 'bold'
                  }}>{item.user.name}</Text>
                </View>
              </TouchableWithoutFeedback>
              <Text numberOfLines={2} style={{
                color: 'white'
              }}>{item.content}</Text>
            </View>
            <View style={{
              gap: 60,
              marginBottom: 30,
              marginStart: 20,
            }}>
              <View style={style.container}>
                <AntDesign name="like1" size={35} color={isLike ? "#DE0000" : "white"} onPress={handleLike}/>
                <Text style={style.text}>{item.likes.length}</Text>
              </View>
              <View style={style.container}>
                <AntDesign name="dislike1" size={35} color="white" />
                <Text style={style.text}>Dislike</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('PostDetails', {
                  _id: item._id
                })
              }}>
                <View style={style.container}>
                  <MaterialCommunityIcons name="comment-text" size={35} color="white" />
                  <Text style={style.text}>{item.comments.length}</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={style.container}>
                <MaterialCommunityIcons name="share" size={35} color="white" />
                <Text style={style.text}>Share</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 2
  },
  text: {
    color: 'white',
    fontWeight: '500'
  }
})