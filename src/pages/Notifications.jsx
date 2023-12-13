import { Text, View, StyleSheet, TouchableWithoutFeedback, FlatList } from "react-native";
import Notification from "../components/Notification";
import { useState } from "react";

export default function Notifications() {
  const [all, setAll] = useState(true)

  return (
    <>
      <View style={{
        backgroundColor: "#181818",
        flex: 1,
        paddingEnd: 10,
        paddingStart: 10
      }}>
        <FlatList
          data={[1,2,3,4,5,6,7,8,9,10]}
          renderItem={({item}) => <Notification item={item}/>}
          keyExtractor={item => item}
          ListHeaderComponent={
            <>
              <View style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 8,
                marginBottom: 12
              }}>
                <TouchableWithoutFeedback onPress={() => {
                  setAll(true)
                }}>
                  {all ? 
                    <Text style={{
                      ...style.text,
                      color: 'black',
                      backgroundColor: 'white'
                    }}>All</Text> :
                    <Text style={{
                      ...style.text,
                      color: 'white',
                      backgroundColor: '#2a2a2a'
                    }}>All</Text>
                  }
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                  setAll(false)
                }}>
                  {all ?
                    <Text style={{
                      ...style.text,
                      backgroundColor: '#2a2a2a',
                      color: 'white'
                    }}>Mention</Text> :
                    <Text style={{
                      ...style.text,
                      backgroundColor: 'white',
                      color: 'black'
                    }}>Mention</Text>
                  }
                </TouchableWithoutFeedback>
              </View>
            </>
          }
        />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 15,
    paddingEnd: 15,
    fontWeight: 'bold',
    borderRadius: 10
  }
})