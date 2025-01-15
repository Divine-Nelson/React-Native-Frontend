import { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import StyledText from "../../componets/Texts/StyledText";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { ScreenWidth } from "../../core/constant";

const DisplaceCard = ({ product }) => {
  const navigation = useNavigation();


  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetails", { id: product.id });
      }}
      style={styles.container}
    >
      <Image source={product.image} style={styles.coverImage} />

      {/* Product Info */}
      <View style={styles.content}>
        <StyledText big style={styles.title}>
          {product.name}
        </StyledText>
        <Text style={styles.priceText}>
          {product.price + product.currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    position: "relative",
  },
  coverImage: {
    height: 260,
    width: ScreenWidth * 0.45,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
  priceText: {
    fontSize: 18,
    color: "#9C9C9C",
    fontWeight: "600",
  },
  content: {
    paddingLeft: 15,
  },
});

export default DisplaceCard;
