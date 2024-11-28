import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from '../navigation/HomeScreen';
import ProductScreen from '../navigation/ProductScreen';
import BookScreen from '../navigation/BookScreen';
import Mybooking from '../navigation/Mybooking';
import ProfileScreen from '../navigation/ProfileScreen';

// Screen names
const homeName = "Home";
const productName = "Product";
const bookName = "Bookings";
const mybookName = "My Bookings";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
  return (
    <>
      {/* Hide the status bar */}
      <StatusBar hidden />

      {/* Bottom Tab Navigator */}
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === productName) {
              iconName = focused ? 'pricetags' : 'pricetags-outline';
            } else if (rn === bookName) {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (rn === mybookName) {
              iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={productName} component={ProductScreen} />
        <Tab.Screen name={bookName} component={BookScreen} />
        <Tab.Screen name={mybookName} component={Mybooking} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
}
