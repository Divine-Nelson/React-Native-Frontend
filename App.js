import React from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme'
import LoginScreen from './src/screens/LoginScreen'
import StartScreen from './src/screens/StartScreen'
import SignupScreen from './src/screens/SignupScreen'
import ResetScreen  from './src/screens/ResetScreen'
import DashboardScreen from './src/screens/DashboardScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="ResetScreen" component={ResetScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
