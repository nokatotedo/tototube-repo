import { StatusBar, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles/Form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST, GET_POSTS } from "../queries/post";

export default function Create({ bottomSheet }) {
  const [input, setInput] = useState({
    content: "",
    tags: "",
    imgUrl: ""
  })

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [
      GET_POSTS
    ]
  })

  function handleInput(key, value) {
    setInput({
      ...input,
      [key]: value
    })
  }

  async function handlePost() {
    try {
      const tags = input.tags.split(" ")
      const imgUrl = input.imgUrl?.includes("http") ? input.imgUrl : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
      await createPost({
        variables: {
          "addPost": {
            ...input,
            imgUrl,
            tags
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <BottomSheet
        ref={bottomSheet}
        height={400}
        radius={20}
        backgroundColor={'rgba(0,0,0,0.8)'}
        sheetBackgroundColor={'#242424'}
        onRequestClose={() => {
          bottomSheet.current.close();
        }}
      >
        <StatusBar backgroundColor={'rgba(0,0,0,0.98)'}/>
        <View style={{
          padding: 20
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              ...styles.textBold,
              fontSize: 22
            }}>Create</Text>
            <Ionicons name="md-close-outline" size={38} color="white" onPress={() => {
              bottomSheet.current.close();
            }} />
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder="Caption" placeholderTextColor="grey" onChangeText={(text) => {
              handleInput("content", text)
            }}/>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder="Tags" placeholderTextColor="grey" onChangeText={(text) => {
              handleInput("tags", text)
            }}/>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder="GIF URL" placeholderTextColor="grey" onChangeText={(text) => {
              handleInput("imgUrl", text)
            }}/>
          </View>
          <TouchableWithoutFeedback onPress={() => { 
            handlePost()
            bottomSheet.current.close()
          }}>
            <View style={styles.submitButton}>
              <Text style={styles.text}>POST</Text>
            </View>
          </TouchableWithoutFeedback>
        </View> 
      </BottomSheet>
    </>
  )
}