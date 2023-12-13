import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FOLLOW_USER, GET_USER } from "../queries/user";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/core";

export default function CardUser({ item }) {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)
  const [isFollow, setIsFollow] = useState(0)
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: item.user._id },
    fetchPolicy: 'no-cache'
  })
  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [
      GET_USER
    ]
  })

  useEffect(() => {
    if(data) {
      setUser(data.user)
    }
  }, [data])

  if(loading) {
    return (
      <Loading />
    )
  }

  async function handleFollow() {
    try {
      await followUser({
        variables: {
          "followUser": {
            "followingId": user._id
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
      {user && <TouchableWithoutFeedback onPress={() => {
        navigation.navigate("User", {
          _id: user._id,
          type: "search"
        })
      }}>
        <View style={{
          margin: 20,
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center'
        }}>
          <Image 
            source={{
              uri: 'https://i.pinimg.com/originals/61/be/2a/61be2af0cfd55adee0d0216a095c515d.jpg'
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30
            }}
          />
          <View style={{
            flex: 1
          }}>
            <Text style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 18
            }}>{user.name}</Text>
            <Text numberOfLines={1} style={{
              color:'grey'
            }}>{`${user.followers.length} Subscribers • ${user.followings.length} Subscribing`}</Text>
            <TouchableWithoutFeedback onPress={handleFollow}>
              <Text style={{
                color: 'grey'
              }}>{isFollow === 2 ? "YOURSELF" : isFollow === 1 ? "SUBSCRIBED" : "SUBSCRIBE"}</Text>
            </TouchableWithoutFeedback>
          </View>
          <Ionicons name="notifications-outline" size={26} color="grey" />
        </View>
      </TouchableWithoutFeedback>}
    </>
  )
}