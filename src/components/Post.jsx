import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { intervalTime } from "../helpers/calculate";
import { useMutation } from "@apollo/client";
import { GET_POSTS, LIKE_POST } from "../queries/post";
import { useState } from "react";
import { FOLLOW_USER, GET_USER } from "../queries/user";

export default function Post({ item }) {
  const [isLike, setIsLike] = useState(false)
  const [isFollow, setIsFollow] = useState(0)
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [
      GET_POSTS
    ]
  })
  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [
      GET_USER
    ]
  })
  const navigation = useNavigation()

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

  async function handleFollow() {
    try {
      await followUser({
        variables: {
          "followUser": {
            "followingId": item.authorId
          }
        }
      })
      setIsFollow(1)
    } catch (error) {
      if(error.message === "Can't Process") {
        setIsFollow(2)
      } else if(error.message === "Already Follow") {
        setIsFollow(1)
      }
    }
  }

  return (
    <>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingStart: 10,
        paddingEnd: 10,
        alignItems: 'center'
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center'
        }}>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('User', {
              _id: item.authorId,
              type: "search"
            })
          }}>
            <Image 
              source={{ uri: 'https://i.pinimg.com/originals/61/be/2a/61be2af0cfd55adee0d0216a095c515d.jpg' }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20
              }}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('User', {
              _id: item.authorId,
              type: "search"
            })
          }}>
            <View>
              <Text style={{
                color: 'white',
                fontWeight: 'bold'
              }}>{item.user.name}</Text>
              <Text style={{
                color: 'grey'
              }}>{intervalTime(item.createdAt)}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={handleFollow}>
            <Text style={{
              backgroundColor: '#2a2a2a',
              color: 'white',
              paddingTop: 6,
              paddingBottom: 6,
              paddingEnd: 12,
              paddingStart: 12,
              borderRadius: 15,
              fontWeight: 'bold'
            }}>{isFollow === 2 ? "Yourself" : isFollow === 1 ? "Subscribed" : "Subscribe"}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('PostDetails', {
          _id: item._id
        })
      }}>
        <Text style={{
          marginTop: 5,
          marginBottom: 10,
          paddingStart: 10,
          paddingEnd: 10,
          fontSize: 16,
          color: 'white'
        }}>{item.content}</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('PostDetails', {
          _id: item._id
        })
      }}>
        <Image source={{uri: item.imgUrl}} style={{
          width: "100%",
          height: 240,
          objectFit: "cover",
          marginBottom: 10
        }}/>
      </TouchableWithoutFeedback>
      <View style={{
        paddingEnd: 10,
        paddingStart: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}>
          <AntDesign name={isLike ? "like1" : "like2" } size={24} color="white" onPress={handleLike}/>
          <Text style={{
            color: 'white',
            marginEnd: 14
          }}>{item.likes.length}</Text>
          <AntDesign name="dislike2" size={24} color="white" />
        </View>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('PostDetails', {
            _id: item._id
          })
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6
          }}>
            <MaterialCommunityIcons name="comment-text-outline" size={24} color="white"/>
            <Text style={{
              color: 'white',
              marginBottom: 4
            }}>{item.comments.length}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}