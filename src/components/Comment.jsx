import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { intervalTime } from "../helpers/calculate";
import { useNavigation } from "@react-navigation/core";

export default function Comment({ item }) {
  const navigation = useNavigation()

  return (
    <>
      <View style={{
        backgroundColor: '#242424',
        marginStart: 20,
        marginEnd: 20,
        padding: 15
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 15
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
                width: 36,
                height: 36,
                borderRadius: 18
              }}
            />
          </TouchableWithoutFeedback>
          <View style={{
            gap: 2,
            flex: 1
          }}>
            <TouchableWithoutFeedback onPress={() => {
              navigation.navigate('User', {
                _id: item.authorId,
                type: "search"
              })
            }}>
              <Text style={{
                color: 'grey'
              }}>{`${item.user.name} • ${intervalTime(item.createdAt)}`}</Text>
            </TouchableWithoutFeedback>
            <Text style={{
              color: 'white'
            }}>{item.content}</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              marginTop: 4
            }}>
              <AntDesign name="like2" size={16} color="white" />
              <AntDesign name="dislike2" size={16} color="white" />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}