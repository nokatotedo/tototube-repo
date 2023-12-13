import * as SecureStore from "expo-secure-store";

export async function getStorage(key) {
  const result = await SecureStore.getItemAsync(key)
  return result
}

export async function setStorage(key, value) {
  await SecureStore.setItemAsync(key, value)
}

export async function deleteStorage(key) {
  await SecureStore.deleteItemAsync(key)
}