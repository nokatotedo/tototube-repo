import { StatusBar, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/Form";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../queries/user";

export default function Login({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(null)
  const { setToken } = useContext(LoginContext)
  const [input, setInput] = useState({
    usernameOrEmail: '',
    password: ''
  })

  const [login, { data, error }] = useLazyQuery(LOGIN_USER, {
    variables: { loginUser: input },
  })

  function handleInput(key, value) {
    setInput({
      ...input,
      [key]: value
    })
  }

  useEffect(() => {
    login()
  }, [input])

  return (
    <>
      <StatusBar backgroundColor={"#181818"}/>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.topView}>
            <View style={{
              flexDirection: 'row'
            }}>
              <Text style={styles.textBold}>Welcome </Text>
              <Text style={{
                color: "#DE0000",  
                fontWeight: "bold",
                fontSize: 18
              }}>Back</Text>
            </View>
            <Text style={styles.text}>We missed you! Login to get Started</Text>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.textBold}>LOGIN</Text>
            {errorMessage && <Text style={{
              color: "#DE0000",
              marginTop: 10
            }}>{`*${errorMessage}`}</Text>}
            <View style={styles.inputView}>
              <TextInput style={styles.input} placeholder="Username/Email" placeholderTextColor="grey" onChangeText={(text) => {
                handleInput("usernameOrEmail", text)
              }}/>
              <View style={styles.inputLogo}>
                <FontAwesome5 name="user-alt" size={15} color="white" />
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" placeholderTextColor="grey" onChangeText={(text) => {
                handleInput("password", text)
              }}/>
              <View style={styles.inputLogo}>
                <FontAwesome5 name="lock" size={15} color="white"/>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={async () => {
              if(data?.login.access_token) {
                await setToken(data.login.access_token)
              } else {
                setErrorMessage(error.message)
              }
            }}>
              <View style={styles.submitButton}>
                <Text style={styles.text}>LOGIN</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{
              flexDirection: 'row',
              marginTop: 20
            }}>
              <Text style={styles.text}>Don't have an account?</Text>
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textLink}>Register</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

