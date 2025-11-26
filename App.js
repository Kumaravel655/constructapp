import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import EngineerDashboard from './screens/EngineerDashboard';
import SubcontractorDashboard from './screens/SubcontractorDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="EngineerDashboard" component={EngineerDashboard} />
        <Stack.Screen name="SubcontractorDashboard" component={SubcontractorDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}