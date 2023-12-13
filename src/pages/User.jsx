import { View, Text, Image } from "react-native";
import Navbar from "../components/Navbar";
import { UserNavigation } from "../navigations/UserNavigation";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries/user";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function User({ route }) {
  const [user, setUser] = useState(null)
  const type = route.params?.type
  const _id = route.params?._id

  const { data, loading } = useQuery(GET_USER, {
    variables: { id: _id },
    fetchPolicy: 'no-cache'
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
  
  return (
    <>
      <View style={{
        backgroundColor: "#181818",
        flex: 1
      }}>
        {type ? "" : <Navbar isLogout={true} /> }
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 10
        }}>
          <Image 
            source={{
              uri: 'https://i.pinimg.com/originals/61/be/2a/61be2af0cfd55adee0d0216a095c515d.jpg'
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40
            }}
          />
          <View>
            <Text style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 22
            }}>{`${user?.name}`}</Text>
            <Text style={{
              color: 'grey'
            }}>{`@${user?.username}`}</Text>
            <Text style={{
              color: 'grey'
            }}>{`${user?.followers.length} Subscribers • ${user?.followings.length} Subscribing`}</Text>
          </View>
        </View>
        {user && <UserNavigation follows={{ followers: user.followers, followings: user.followings }} id={user._id}/>}
      </View>
    </>
  )
}