import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#181818"
  },
  text: {
    color: "white"
  },
  textBold: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomView: {
    flex: 2,
    backgroundColor: "#242424",
    borderTopStartRadius: 40,
    borderTopEndRadius:40,
    paddingTop: 40,
    paddingStart: 40,
    paddingEnd: 40
  },
  inputView: {
    backgroundColor: "#555555",
    borderRadius: 20,
    padding: 10,
    paddingEnd: 20,
    paddingStart: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16
  },
  inputLogo: {
    marginStart: 15
  },
  submitButton: {
    backgroundColor: "#DE0000",
    marginTop: 20,
    alignItems: "center",
    borderRadius: 20,
    padding: 10
  },
  textLink: {
    color: '#DE0000',
    fontSize: 14,
    marginStart: 5,
    marginBottom: 20
  }
})