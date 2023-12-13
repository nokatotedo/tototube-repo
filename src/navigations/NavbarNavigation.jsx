import Notifications from "../pages/Notifications";
import Posts from "../pages/Posts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsSubscription from "../pages/PostsSubscription";
import User from "../pages/User";
import Search from "../pages/Search";

const Stack = createNativeStackNavigator();

export function NavbarNavigation({ firstScreen }) {
  return (
    <Stack.Navigator
      initialRouteName={firstScreen}
    >
      <Stack.Screen name="Posts" component={Posts} options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{
        headerStyle: {
          backgroundColor: '#181818'
        },
        headerTintColor: "white"
      }}/>
      <Stack.Screen name="PostsSubscription" component={PostsSubscription} options={{ headerShown: false }} />
      <Stack.Screen name="MyUser" component={User} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false, animation: 'none' }} />
    </Stack.Navigator>
  )
}