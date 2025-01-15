import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../core/theme";
import onIOS from "../core/constant";
import {Feather} from "@expo/vector-icons";
import Product from "./Productfolder/ProductScreen";
import  ProductDetails from "./Productfolder/ProductDetails";

const Stack = createStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator initialRouteName="Product"
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
        name="Product"
        component={Product}
        options={{ headerShown: false }} // This hides the header for ProductScreen
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ title: "", headerStyle: {
          backgroundColor: colors.secondary,
          borderBottomWidth: 0,
          elevation: 0,
          shadowColor:"transparent",
          shadowOpacity: 0,
        } }}
      />
    </Stack.Navigator>
  );
};

export default ProductStack;