import {ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
import { getStorage } from "../helpers/storage"

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_SERVER,
})

const authLink = setContext(async () => {
  const token = await getStorage("token")

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client