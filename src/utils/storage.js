import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;  // Parse if the value exists
  } catch (error) {
    console.error("Error reading value from AsyncStorage", error);
    return null;
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));  // Save as a string
  } catch (error) {
    console.error("Error saving value to AsyncStorage", error);
  }
};
