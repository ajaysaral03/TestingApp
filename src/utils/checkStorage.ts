
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkLocalStorage = async () => {
  try {
    console.log('========== STORAGE CHECK START ==========');

    const keys = await AsyncStorage.getAllKeys();

    console.log('TOTAL KEYS:', keys.length);
    console.log('STORAGE KEYS:', keys);

    if (keys.length === 0) {
      console.log('NO DATA FOUND IN ASYNC STORAGE');
      return;
    }

    const data = await AsyncStorage.multiGet(keys);

    data.forEach(([key, value]) => {
      console.log('\nKEY:', key);

      try {
        const parsedData = value ? JSON.parse(value) : null;

        console.log(
          'VALUE:',
          JSON.stringify(parsedData, null, 2)
        );
      } catch {
        console.log('VALUE:', value);
      }
    });

    console.log('========== STORAGE CHECK END ==========');

  } catch (error) {
    console.log('STORAGE ERROR:', error);
  }
};
