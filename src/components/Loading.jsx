import { Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#181818'
    }}>
      <Text style={{
        color: 'white',
        fontWeight: 'bold'
      }}>Now Loading...</Text>
    </View>
  )
}