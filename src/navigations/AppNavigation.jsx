import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDetails from "../pages/PostDetails";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import User from "../pages/User";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  const { login } = useContext(LoginContext)

  return (
    <Stack.Navigator>
      { login ? 
        <>
          <Stack.Screen name="Home" component={Home} options={{ animation: 'slide_from_right', headerShown: false }}/>
          <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Details', headerStyle: {
            backgroundColor: '#181818'
          }, headerTintColor: 'white' }}/>
          <Stack.Screen name="User" component={User} options={{ title: 'Details', headerStyle: {
            backgroundColor: '#181818'
          }, headerTintColor: 'white' }}/>
        </> :
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        </>
      }
    </Stack.Navigator>
  )
}