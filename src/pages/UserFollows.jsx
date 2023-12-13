import { FlatList, Text, View } from "react-native";
import CardUser from "../components/CardUser";
import { useEffect, useState } from "react";

export default function UserFollows({ type, follows }) {
  const [followsList, setFollowsList] = useState([])

  useEffect(() => {
    type === "Follower" ? setFollowsList(follows.followers) : setFollowsList(follows.followings)
  }, [follows.followers, follows.followings])

  return (
    <>
      <View style={{
        backgroundColor: "#181818",
        flex: 1
      }}>
        {followsList.length > 0 ? <FlatList 
          data={followsList}
          renderItem={({item}) => <CardUser item={item} />}
          keyExtractor={item => item._id}
        /> : <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontWeight: 'bold',
            color: 'white'
          }}>{type === "Follower" ? "No Subscribers" : "No Subscribing"}</Text>
        </View>}
      </View>
    </>
  )
}