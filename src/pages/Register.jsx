import { StatusBar } from "expo-status-bar";
import { styles } from "../styles/Form";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../queries/user";

export default function Register({ navigation }) {
  const [input, setInput] = useState({
    email: "",
    name: "",
    password: "",
    username: ""
  })

  const [errorMessage, setErrorMessage] = useState(null) 
  const [registerUser] = useMutation(REGISTER_USER)

  async function handleRegister() {
    try {
      if(!input.email || !input.name || !input.password || !input.username) {
        throw new Error("Input Required")
      }
      if(input.username.includes(" ")) throw new Error("Spaces Not Allowed (Username)")
      await registerUser({
        variables: {
          "registerUser": input
        }
      })
      navigation.navigate("Login")
    } catch (error) {
      setInput({
        email: "",
        name: "",
        password: "",
        username: ""
      })
      setErrorMessage(error.message)
    }
  }

  function handleInput(key, value) {
    setInput({
      ...input,
      [key]: value
    })
  }

  return (
    <>
      <StatusBar backgroundColor={"#181818"}/>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.topView}>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.textBold}>Welcome to </Text>
              <Text style={{
                color: "#DE0000",  
                fontWeight: "bold",
                fontSize: 18
              }}>TotoTube</Text>
            </View>
            <Text style={styles.text}>Share your lucky video everywhere</Text>
          </View>
          <View style={styles.bottomView}>
            <ScrollView>
              <Text style={styles.textBold}>REGISTER</Text>
              {errorMessage && <Text style={{
                color: "#DE0000",
                marginTop: 10
              }}>{`*${errorMessage}`}</Text>}
              <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="Name" placeholderTextColor="grey"
                  value={input.name}
                  onChangeText={(text) => handleInput("name", text)}
                />
                <View style={styles.inputLogo}>
                  <FontAwesome5 name="user-alt" size={15} color="white" />
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor="grey"
                  value={input.username}
                  onChangeText={(text) => handleInput("username", text)}
                />
                <View style={styles.inputLogo}>
                  <FontAwesome5 name="marker" size={15} color="white" />
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="grey"
                  value={input.email}
                  onChangeText={(text) => handleInput("email", text)}
                />
                <View style={styles.inputLogo}>
                  <FontAwesome name="envelope" size={15} color="white"/>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" placeholderTextColor="grey"
                  value={input.password}
                  onChangeText={(text) => handleInput("password", text)}
                />
                <View style={styles.inputLogo}>
                  <FontAwesome5 name="lock" size={15} color="white"/>
                </View>
              </View>
              <TouchableWithoutFeedback onPress={handleRegister}>
                <View style={styles.submitButton}>
                  <Text style={styles.text}>REGISTER</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{
                flexDirection: 'row',
                marginTop: 20
              }}>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.textLink}>Login</Text>
                </TouchableWithoutFeedback>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}