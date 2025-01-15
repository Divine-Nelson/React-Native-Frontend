import { useContext, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import { color } from "../core/theme";
import StyledButton from "../componets/button/StyledButton";
import {Feather}  from '@expo/vector-icons';
import{onIOS} from "../core/constant";
import { OnboardingContext } from "../utils/context";
import { storeData } from "../utils/storage";

const Stack = createStackNavigator();

const OnboardingStack = () => {
  const { setIsAppOnboarded } = useContext(OnboardingContext);
  const [completingOnboarding, setCompletingOnboarding] = useState(false);

  const completeOnboarding = async () => {
    try {
      setCompletingOnboarding(true);
      // Save the onboarding status as true in storage
      await storeData("@APP:Onboarding", true);

      // After storing, update the state to reflect onboarding is completed
      setTimeout(() => {
        setIsAppOnboarded(true);  // This will make sure onboarding is not shown again
        setCompletingOnboarding(false);
      }, 500);
    } catch (error) {
      console.warn(error);
      setCompletingOnboarding(false);
    }
  };

  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center', 
      headerTintColor: color.tint,
      headerRight: () => (
        <StyledButton         
          onPress={completeOnboarding}
          isLoading={completingOnboarding}
          style={{height: 'auto', width: 'auto', padding: 10, backgroundColor: 'transparent'}}
          textStyle={{
            color: color.accent,
            fontSize: 14,
            fontWeight: "normal",
          }}
        >
          SKIP
        </StyledButton>
      ),
      headerRightContainerStyle: { right: 25 },
      headerTransparent: true,
      headerBackImage: ({ tintColor }) => (
        <Feather name="chevron-left" size={35} color={tintColor} />
      ),
      headerLeftContainerStyle: {
        left: onIOS ? 22 : 12,
      },
      headerBackTitleVisible: false,
      headerBackTitle: '',
    }}>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;