import { useNavigation } from "@react-navigation/core";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";

export default function Notification() {
  const navigation = useNavigation()

  return (
    <>
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate('PostDetails')
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12
        }}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/61/be/2a/61be2af0cfd55adee0d0216a095c515d.jpg'
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20
            }}
          />
          <View style={{
            flex: 1,
            paddingStart: 20,
            paddingEnd: 20
          }}>
            <Text numberOfLines={3} style={{
              color: 'white'
            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin faucibus justo purus, quis varius leo ullamcorper quis.</Text>
            <Text style={{
              color: 'grey'
            }}>23 menit yang lalu</Text>
          </View>
          {/* <View style={{
            overflow: "hidden",
            width: 150,
            height: 75,
            borderRadius: 10
          }}>
            <Image source={{uri: "https://cdna.artstation.com/p/media_assets/images/images/001/228/978/original/slot-5000.gif?1700755488" }} style={{
              width: 150,
              height: 80,
              objectFit: "cover"
            }}/>
          </View> */}
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}