import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StyledText from "./Texts/StyledText";
import { colors } from "../core/theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const SectionHeader = ({ children, style, rightText, rightTextOnPress }) => {
  return (
    <View style={[styles.sectionContainer, style]}>
      <StyledText bold>{children}</StyledText>

      {rightText && (
        <TouchableOpacity style={styles.button} onPress={rightTextOnPress}>
          <StyledText style={styles.buttonText}>{rightText + " "}</StyledText>
          <AntDesign name="arrowright" size={16} color={colors.tertiary + "cc"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const TopHeader = ({ initials, style, isHomeScreen, fullName }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.topHeaderContainer, style]}>
      {isHomeScreen ? (
        <View style={styles.welcomeContainer}>
          <StyledText bold style={styles.welcomeText}>
            Welcome, {fullName}
          </StyledText>
          <TouchableOpacity style={styles.buttonContainer}onPress={() =>{
            navigation.navigate("StartScreen");
            
          }}>
            <StyledText big style={styles.button}>
              <Feather name='log-out'/>
            </StyledText>
            
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/recovery_lab.jpg")}
              style={styles.appIcon}
            />
          </View>
          {/* Render initials container only if not HomeScreen */}
          <View style={styles.initialsContainer}>
            <StyledText big style={{ color: colors.secondary }}>
              {initials}
            </StyledText>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: colors.primary,
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 18,
    color: colors.black,
  },
  buttonContainer: {
    backgroundColor: colors.tertiary,
    padding: 10,
    borderRadius: 20,
  },
  button: {
    color: colors.primary,
  },
  appIcon: {
    height: 28,
    width: 28,
  },
  initialsContainer: {
    backgroundColor: "#666",
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

});

export { SectionHeader, TopHeader };
