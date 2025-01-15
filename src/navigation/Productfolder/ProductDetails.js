import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import ScrollableContainer from "../../componets/Container/ScrollableContainer";
import StyledText from "../../componets/Texts/StyledText";
import StyledButton from "../../componets/button/StyledButton";
import CartCounter from "../../componets/input/CartCounter";
import ProductInfo from "./productInfo";
import { getProductDetails } from "../../data/index";
import { storeData } from "../../utils/storage";
import { CartContext, SavedProductsContext } from "../../utils/context";
import { colors } from "../../core/theme";

const ProductDetails = ({ route }) => {
  const productId = route.params?.id;
  const [fetchProduct, setFetchProduct] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [saved, setSaved] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);
  const { savedProducts, setSavedProducts } = useContext(SavedProductsContext);

  const validSavedProducts = savedProducts.filter(
    (product) => product !== null && product !== undefined
  );

  const fetchProductDetails = () => {
    try {
      const productData = getProductDetails({ productId });
      if (productData && productData.length > 0) {
        setFetchProduct(productData[0]);
      } else {
        console.warn("Product data not found");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSaveProduct = async () => {
    try {
      let updatedSavedProducts;
      if (!saved) {
        updatedSavedProducts = [...validSavedProducts, fetchProduct];
      } else {
        updatedSavedProducts = savedProducts.filter(
          (savedProduct) => savedProduct.id !== productId
        );
      }
      await storeData("@App:savedProducts", updatedSavedProducts);
      setSavedProducts(updatedSavedProducts);
      setSaved(!saved);
    } catch (error) {
      console.warn("Error saving product:", error);
    }
  };

  const checkSavedStatus = () => {
    if (validSavedProducts.some((savedProduct) => savedProduct.id === productId)) {
      setSaved(true);
    }
  };

  const checkCartStatus = () => {
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem) {
      setAddedToCart(true);
      setCartCount(cartItem.cartCount);
    }
  };

  const handleAddToCart = async (newCount) => {
    try {
      let updatedCartItems;
      if (!addedToCart) {
        updatedCartItems = [{ ...fetchProduct, cartCount: 1 }, ...cartItems];
        newCount = 1;
      } else {
        if (newCount > 0) {
          const itemIndex = cartItems.findIndex((item) => item.id === productId);
          cartItems[itemIndex].cartCount = newCount;
        }
        updatedCartItems = [...cartItems];
      }
      await saveCartItems(updatedCartItems, newCount);
      setAddedToCart(true);
    } catch (error) {
      console.warn("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      if (addedToCart) {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        await saveCartItems(updatedCartItems);
        setAddedToCart(false);
      }
    } catch (error) {
      console.warn("Error removing from cart:", error);
    }
  };

  const saveCartItems = async (updatedCartItems, newCount = 0) => {
    try {
      await storeData("@App:CartItems", updatedCartItems);
      setCartItems(updatedCartItems);
      setCartCount(newCount);
    } catch (error) {
      console.warn("Error saving cart items:", error);
    }
  };

  useEffect(() => {
    if (!productId) {
      console.warn("Product ID is undefined");
      return;
    }
    fetchProductDetails();
    checkCartStatus();
    checkSavedStatus();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollableContainer style={styles.container}>
        <View style={styles.topSection}>
          <StyledText bold style={styles.name}>
            {fetchProduct?.name}
          </StyledText>
          <ProductInfo label="Category" style={styles.info}>
            {fetchProduct?.category}
          </ProductInfo>
          <StyledText big style={styles.price}>
            {fetchProduct?.price + fetchProduct?.currency}
          </StyledText>
          <TouchableOpacity style={styles.heart} onPress={handleSaveProduct}>
            <AntDesign
              name={saved ? "heart" : "hearto"}
              size={27}
              color={saved ? colors.accent + "cc" : colors.tertiary + "cc"}
            />
          </TouchableOpacity>
          <Image source={fetchProduct?.image} style={styles.image} />
        </View>
        <View style={styles.bottomSection}>
          <ProductInfo label="Description" style={styles.info}>
            {fetchProduct?.description}
          </ProductInfo>
          <View style={styles.cartRow}>
            {!addedToCart ? (
              <StyledButton icon="shoppingcart" onPress={handleAddToCart}>
                Add to cart
              </StyledButton>
            ) : (
              <>
                <StyledButton
                  icon="delete"
                  style={styles.removeButton}
                  textStyle={styles.removeButtonText}
                  onPress={handleRemoveFromCart}
                >
                  Remove
                </StyledButton>
                <CartCounter
                  style={styles.cartCounter}
                  count={cartCount}
                  setCount={handleAddToCart}
                  limit={fetchProduct?.quantityAvailable}
                />
              </>
            )}
          </View>
        </View>
      </ScrollableContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    paddingBottom: 30,
  },
  topSection: {
    marginBottom: 30,
    paddingHorizontal: 25,
    paddingBottom: 30,
    backgroundColor: colors.secondary,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  name: {
    marginBottom: 50,
    fontSize: 30,
  },
  info: {
    marginTop: 25,
    marginBottom: 25,
  },
  heart: {
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: -20,
    right: "50%",
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.secondary,
    zIndex: 1,
  },
  image: {
    position: "absolute",
    height: "110%",
    width: "100%",
    resizeMode: "contain",
    right: -95,
    top: 40,
    marginRight: 20,
  },
  bottomSection: {
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  cartRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  removeButton: {
    width: "47%",
    backgroundColor: colors.secondary,
  },
  removeButtonText: {
    color: colors.tertiary + "cc",
  },
  cartCounter: {
    width: "47%",
  },
});

export default ProductDetails;
