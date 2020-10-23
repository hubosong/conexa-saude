import AsyncStorage from '@react-native-community/async-storage'

export async function getUser() {
  try {
    return await AsyncStorage.getItem('@userToken');
  } catch (e) {
    throw e
  }
}

export async function deleteUser() {
  try {
    return await AsyncStorage.removeItem('@userToken');
  } catch (e) {
    throw e;
  }
}