import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage() {
  const setItem = async (key: string, value: string) => {
    try {
      var data: string | object = value;
      if (typeof value === 'object') {
        data = JSON.stringify(value);
      }
      await AsyncStorage.setItem(key, data);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getItem = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };
  return {setItem, getItem, removeItem};
}

export default useAsyncStorage;
