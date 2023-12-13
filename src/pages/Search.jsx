import { FlatList, TextInput, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "../styles/Form";
import CardUser from "../components/CardUser";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USERS } from "../queries/user";
import Loading from "../components/Loading";

export default function Search({ navigation }) {
  const [input, setInput] = useState({
    nameOrUsername: ""
  })

  const [users, setUsers] = useState([])

  const [getUsers, { data }] = useLazyQuery(GET_USERS, {
    variables: { searchUser: { nameOrUsername: input.nameOrUsername } },
  })

  useEffect(() => {
    getUsers()
  }, [input.nameOrUsername])

  useEffect(() => {
    if(data) {
      const usersList = data.searchUser.map(user => {
        return {
          user 
        }
      })
      setUsers(usersList)
    }
  }, [data])

  return (
    <>
      <View style={{
        flex: 1,
        backgroundColor: '#181818'
      }}>
        <View style={{
          height: 60,
          backgroundColor: '#181818',
          flexDirection: 'row',
          alignItems: 'center',
          paddingStart: 18
        }}>
          <MaterialIcons name="arrow-back" size={24} color="white" onPress={() => {
            navigation.goBack()
          }}/>
          <View style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 10,
            marginStart: 18,
            marginEnd: 18,
            backgroundColor: '#555555',
            paddingStart: 20,
            paddingEnd: 20,
            borderRadius: 30
          }}>
            <TextInput style={styles.input} placeholder="Search" placeholderTextColor="grey" onChangeText={(text) => {
              setInput({
                nameOrUsername: text
              })
            }}/>
          </View>
        </View>
        {users.length > 0 ? <FlatList 
          data={users}
          renderItem={({item}) => <CardUser item={item}/>}
          keyExtractor={item => item.user._id}
        /> : <></>}
      </View>
    </>
  )
}