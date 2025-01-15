import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import StyledText from "../Texts/StyledText";
import { ScreenWidth } from "../../core/constant";
import { colors } from "../../core/theme";

const DumBellCards = ({ id, name, image, currency, price, onPress }) => {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <View style={styles.details}>
          <StyledText style={styles.text} small numberOfLines={2}>
            {name}
          </StyledText>
          <StyledText style={styles.price} bold>
            {price + currency}
          </StyledText>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: ScreenWidth * 0.36,
      height: ScreenWidth * 0.46, // Adjusted height for better fit
      minWidth: 135,
      minHeight: 173, // Ensures the container has enough space for image and details
      backgroundColor: colors.secondary,
      borderRadius: 15,
      marginTop: 60, // Reduced margin for better alignment
      marginRight: 25,
      justifyContent: "flex-start", // Align content at the top
      overflow: "hidden", // Ensures the image doesn't overflow the container
    },
    image: {
      width: "100%",
      height: "60%", // Image takes up 60% of the container's height
      resizeMode: "cover", // Ensures the image fits well without distortion
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    details: {
      flex: 1,
      padding: 10,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white", // Adjust if needed to match your theme
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    text: {
      textAlign: "center",
      marginBottom: 5,
    },
    price: {
      color: colors.accent + "cc",
      textAlign: "center",
    },
  });
  
  export default DumBellCards;