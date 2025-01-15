import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import StyledText from "../Texts/StyledText";
import { colors } from "../../core/theme";
import { AntDesign } from "@expo/vector-icons";

const StyledButton = ({ children, style, textStyle, icon, onPress, isLoading }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress} // Corrected
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={textStyle?.colors || colors.secondary}
        />
      )}

      {!isLoading && (
        <>
          {!icon && (
            <StyledText style={[styles.text, textStyle]}>{children}</StyledText>
          )}
          {icon && (
            <>
              <StyledText bold style={[styles.text, textStyle]}>
                {children + " "}
              </StyledText>
              <AntDesign
                name={icon}
                size={19}
                color={textStyle?.colors || colors.primary}
                style={[styles.text, textStyle]}
              />
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent + "cc", // Fixed typo
    borderRadius: 15,
    flexDirection: "row",
  },
  text: {
    color: colors.primary,
  },
});

export default StyledButton;
