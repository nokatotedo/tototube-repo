import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PostsUser from '../pages/PostsUser'
import UserFollows from '../pages/UserFollows'

const Tab = createMaterialTopTabNavigator()

export function UserNavigation({ follows, id }) {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: "#181818",
      },
      tabBarLabelStyle: {
        color: 'white'
      },
      tabBarIndicatorStyle: {
        backgroundColor: '#DE0000'
      }
    }}>
      <Tab.Screen name='PostsUser' children={() => <PostsUser type={"My"} id={id}/>} options={{
        title: 'Posts'
      }}/>
      <Tab.Screen name='FollowerUser' children={() => <UserFollows type={"Follower"} follows={follows}/>} options={{
        title: 'Subscribers'
      }}/>
      <Tab.Screen name='FollowingUser' children={() => <UserFollows type={"Following"} follows={follows}/>} options={{
        title: 'Subscribing'
      }}/>
    </Tab.Navigator>
  )
}