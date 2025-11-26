import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Token management
  async saveToken(token) {
    try {
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // User data management
  async saveUserData(userData) {
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  async clearUserData() {
    try {
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }
}

export default new StorageService();