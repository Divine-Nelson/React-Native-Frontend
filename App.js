import React, { useEffect, useState } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { theme } from "./src/core/theme";
import { OnboardingContext, CartContext, SavedProductsContext } from "./src/utils/context";
import { getData } from "./src/utils/storage";

import OnboardingStack from "./src/navigation/OnboardingStack";
import StartScreen from "./src/screens/StartScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ResetScreen from "./src/screens/ResetScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ProductStack from "./src/navigation/ProductStack";
import CartStack from "./src/navigation/CartStack";

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [isAppOnboarded, setIsAppOnboarded] = useState(null); // Tracks onboarding status
  const [cartItems, setCartItems] = useState([]); // Tracks items in the cart
  const [savedProducts, setSavedProducts] = useState([]); // Tracks saved products

  // Prepare app data (onboarding status, cart, saved products)
  const prepareApp = async () => {
    try {
      const onboardingStatus = await getData("@APP:Onboarding");
      const cartItemData = await getData("@App:CartItems");
      const savedProductsData = await getData("@App:savedProducts");

      setIsAppOnboarded(!!onboardingStatus); // true if onboarding is complete, false otherwise
      cartItemData && setCartItems(cartItemData);
      savedProductsData && setSavedProducts(savedProductsData);
    } catch (error) {
      console.warn("Error loading app data:", error);
      setIsAppOnboarded(false); // Default to not onboarded in case of error
    } finally {
      SplashScreen.hideAsync(); // Hide splash screen after initialization
    }
  };

  // Load app data on first render
  useEffect(() => {
    prepareApp();
  }, []);

  // Wait until onboarding status is determined
  if (isAppOnboarded === null) {
    return null; // Show nothing while checking
  }

  return (
    <OnboardingContext.Provider value={{ isAppOnboarded, setIsAppOnboarded }}>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <SavedProductsContext.Provider value={{ savedProducts, setSavedProducts }}>
          <Provider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={isAppOnboarded ? "StartScreen" : "OnboardingStack"}
                screenOptions={{ headerShown: false }}
              >
                {/* Onboarding and Authentication */}
                <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="ResetScreen" component={ResetScreen} />

                {/* Main App */}
                <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
                <Stack.Screen name="ProductStack" component={ProductStack} />
                <Stack.Screen name="CartStack" component={CartStack} />
              </Stack.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
          </Provider>
        </SavedProductsContext.Provider>
      </CartContext.Provider>
    </OnboardingContext.Provider>
  );
}
