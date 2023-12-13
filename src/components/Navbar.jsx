import { Text, View } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

export default function Navbar({ isLogout }) {
  const { deleteToken } = useContext(LoginContext)
  const navigation = useNavigation()

  return (
    <>
      <View style={{
        height: 60,
        backgroundColor: "#181818",
        paddingStart: 10,
        paddingEnd: 20,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row'
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <AntDesign name="youtube" size={30} color="#DE0000" style={{
            marginEnd: 2,
            marginTop: 3,
          }}/>
          <Text style={{
            color: 'white',
            fontSize: 18,
            marginStart: 4,
            fontFamily: 'Oswald_500Medium'
          }}>TotoTube</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center'
        }}>
          <Ionicons name="notifications-outline" size={22} color="white" onPress={() => {
            navigation.navigate('Notifications')
          }}/>
          <AntDesign name="search1" size={20} color="white" onPress={() => {
            navigation.navigate('Search')
          }}/>
          {isLogout && <MaterialIcons name="logout" size={24} color="white" onPress={async () => {
            deleteToken()
          }}/> }
        </View>
      </View>
    </>
  )
}