import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function PhotoUser({ item }) {
  const navigation = useNavigation()

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {
         navigation.navigate('User', {
          _id: item.user._id,
          type: "search"
        })
      }}>
        <View style={{
          margin: 8,
          width: 60,
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
          <Text numberOfLines={1} style={{
            color: 'white'
          }}>{item.user.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}