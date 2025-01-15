import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../core/theme";
import onIOS from "../core/constant";
import {Feather} from "@expo/vector-icons";
import Profile from "./Productfolder/ProfileScreen";
import ProductDetails from "./Productfolder/ProductDetails";


const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.tint,
        headerBackImage: ({ tintColor }) => (
          <Feather name="chevron-left" size={35} color={tintColor} />
        ),
        headerLeftContainerStyle: {
          left: onIOS ? 22 : 12,
        },
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "white",
          borderBottomWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }} // This hides the header for ProfileScreen
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: "" }} // Customize the header for ProductDetails
      />
    </Stack.Navigator>
  );
};
export default ProfileStack;