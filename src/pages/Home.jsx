import { StatusBar } from "react-native";
import { HomeNavigation } from "../navigations/HomeNavigation";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={'#181818'}/>
      <HomeNavigation />
    </>
  )
}

