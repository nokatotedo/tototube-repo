import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./src/navigations/AppNavigation";
import { useFonts, Oswald_500Medium } from '@expo-google-fonts/oswald';
import { LoginProvider } from "./src/contexts/LoginContext";
import { ApolloProvider } from "@apollo/client";
import client from "./src/config/apollo";

export default function App() {
  const [fontsLoaded] = useFonts({
    Oswald_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client} >
      <NavigationContainer>
        <LoginProvider children={
          <AppNavigation />
        } />
      </NavigationContainer>
    </ApolloProvider>
  )
}