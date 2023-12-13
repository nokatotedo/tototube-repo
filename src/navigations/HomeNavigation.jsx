import Create from "../pages/Create";
import { Text, StyleSheet } from "react-native";
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Shorts from "../pages/Shorts";
import { NavbarNavigation } from "./NavbarNavigation";
import { useRef } from "react";

const Tab = createBottomTabNavigator();

export function HomeNavigation() {
  const bottomSheet = useRef();
  
  return (
    <>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: "#181818",
          height: 60
        },
        tabBarShowLabel: false
      }}>
        <Tab.Screen name="HomeTab" children={() => <NavbarNavigation firstScreen={"Posts"}/>} options={{headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? <MaterialCommunityIcons name="home-variant" size={22} color="white" /> : <MaterialCommunityIcons name="home-variant-outline" size={22} color="white" />}
              <Text style={style.text}>Home</Text>
            </>
          )
        }}}/>
        <Tab.Screen name="ShortsTab" component={Shorts} options={{headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? <MaterialCommunityIcons name="play-circle" size={22} color="white" /> : <MaterialCommunityIcons name="play-circle-outline" size={22} color="white" />}
              <Text style={style.text}>Shorts</Text>
            </>
          )
        }}}/>
        <Tab.Screen name="CreateTab" component={Create} options={{headerShown: false, tabBarIcon: () => {
          return (
            <AntDesign name="pluscircleo" size={42} color="white" />
          )
        }}} listeners={() => ({
          tabPress: event => {
            event.preventDefault()
            bottomSheet.current.show()
          }
        })}/>
        <Tab.Screen name="SubscriptionTab" children={() => <NavbarNavigation firstScreen={"PostsSubscription"}/>} options={{headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? <FontAwesome name="bookmark" size={22} color="white" /> : <FontAwesome name="bookmark-o" size={22} color="white" />}
              <Text style={style.text}>Subscription</Text>
            </>
          )
        }}}/>
        <Tab.Screen name="UserTab" children={() => <NavbarNavigation firstScreen={"MyUser"}/>} options={{headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <>
              {focused ? <FontAwesome name="user-circle" size={22} color="white" /> : <FontAwesome name="user-circle-o" size={22} color="white" /> }
              <Text style={style.text}>User</Text>
            </>
          )
        }}}/>
      </Tab.Navigator>
      <Create bottomSheet={bottomSheet}/>
    </>
  )
}

const style = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14
  }
})