import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../navigation/HomeScreen";
import ProductStack from "../navigation/ProductStack";
import BookScreen from "../navigation/BookScreen";
import CartStack from "../navigation/CartStack";
import ProfileStack from "../navigation/ProfileStack";
import { colors } from "../core/theme";
import { CartContext } from "../utils/context";

const Tab = createBottomTabNavigator();

function CartIconWithBadge({ size, color, cartCount }) {
  return (
    <View style={styles.iconWithBadge}>
      <MaterialCommunityIcons name="cart" size={size} color={color} />
      {cartCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </View>
  );
}

export default function DashboardScreen() {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <StatusBar hidden />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "Home":
                return <AntDesign name="home" size={size + 1} color={color} />;
              case "Products":
                return <Feather name="tag" size={size} color={color} />;
              case "Bookings":
                return <Feather name="calendar" size={size} color={color} />;
              case "Cart":
                return (
                  <CartIconWithBadge
                    size={size}
                    color={color}
                    cartCount={cartItems.length}
                  />
                );
              case "Profile":
                return <Feather name="user" size={size} color={color} />;
              default:
                return null;
            }
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Products" component={ProductStack} />
        <Tab.Screen name="Bookings" component={BookScreen} />
        <Tab.Screen
          name="Cart"
          component={CartStack}
          options={{
            tabBarBadge: cartItems.length > 0 ? cartItems.length : null,
            tabBarBadgeStyle: {
              backgroundColor: colors.amber,
              color: colors.primary,
            },
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  iconWithBadge: {
    width: 24,
    height: 24,
    margin: 5,
  },
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "tomato",
    borderRadius: 6,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
