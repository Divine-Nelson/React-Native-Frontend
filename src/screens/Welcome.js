import { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import StyledText from "../componets/Texts/StyledText";
import StyledButton from "../componets/button/StyledButton";
import { onboardingData } from "../core/data";
import { color } from "../core/theme";
import {ScreenWidth} from "../core/constant";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { HeaderHeightContext } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import {storeData} from "../utils/storage";
import { OnboardingContext } from "../utils/context";

const Welcome = ({route}) =>{
    const navigation = useNavigation();
    const [activeScreen] = useState(route.params?.activeScreen || 1);
    const onLastScreen = activeScreen === onboardingData.length;

    const{setIsAppOnboarded} = useContext(OnboardingContext);

    const[completingOnboarding, setCompletingOnboarding] = useState(false);

    const completeOnboarding = async () => {
        try{
            setCompletingOnboarding(true);
            await storeData("@APP:Onboarding", true);

            setTimeout(() => {
                setIsAppOnboarded(true);
                setCompletingOnboarding(false);
            }, 500);
        }catch(error){
            console.warn(error)
            setCompletingOnboarding(false);
        }
    };

    useEffect(() => {
        if (onLastScreen){
            navigation.setOptions({
                headerRight: () =><></>
            })
            
        }
    }, [])

    return(
        <View style={styles.container}>
            <Image source={onboardingData[activeScreen -1].image} 
            style={styles.backgroundImage}/>

            <View style={{marginTop: useContext(HeaderHeightContext)}}>
                <View style={styles.imageContainer}>
                    <Image source={onboardingData[activeScreen -1].image} 
                    style={styles.image}/>
                </View>
                <StyledText style={styles.title}>{onboardingData[activeScreen -1].title}</StyledText>
                <StyledText style={styles.summary}>{onboardingData[activeScreen -1].summary}</StyledText>
            </View>
            <View style={styles.bottomContent}>
                <View style={styles.pageIndicators}>
                    {onboardingData.map((Item)=>{
                        if (Item.id == activeScreen){
                            return (
                                <MaterialCommunityIcons 
                                name="checkbox-blank-circle" 
                                size ={15} 
                                color={color.accent + "cc"} 
                                key={Item.id}
                            />
                            );
                        }
                        return (
                            <MaterialCommunityIcons name="checkbox-blank-circle-outline" 
                            size ={15} 
                            color={color.tertiary + "33"} 
                            key={Item.id}
                        />
                        );
                    })}
                </View>
                <StyledButton 
                icon="arrowright" 
                isLoading={completingOnboarding}
                onPress={() => {
                    if (onLastScreen){
                        navigation.navigate("StartScreen");
                        return completeOnboarding();
                    }
                    navigation.push("Welcome", {activeScreen: activeScreen + 1})
                }}> 
                {onLastScreen ? "Explore ": "Next"}</StyledButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: color.primary,
        paddingHorizontal: 35
    },

    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        opacity: 0.1
    
    },
    imageContainer: {
        width: ScreenWidth - 70,
        height: ScreenWidth - 70,
        borderRadius: 45,
        marginBottom: 35,
        overflow: 'hidden'
    },
    image:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    summary: {
        textAlign: "center",
        color: color.tertiary,
        fontWeight: 'bold',
    },
    bottomContent:{
        alignItems: 'center',
        marginBottom: 25
    },
    pageIndicators:{
        flexDirection: 'row',
        marginBottom: 15
    }
})

export default Welcome;
