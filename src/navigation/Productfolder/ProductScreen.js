import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MainContainer from "../../componets/Container/MainContainer";
import { TopHeader } from "../../componets/SectionHeader";
import StyledText from "../../componets/Texts/StyledText";
import Catagory from "../../componets/Catagory";
import DisplaceCard from "./DisplaceCard";
import { fetchUserDetails } from "../../services/authService";
import { AUTH_TOKEN_KEY } from "../../core/constant";
import { productData } from "../../data/index";
import { colors } from "../../core/theme";

const categories = ["Deals", "Massage Gun", "Mats", "Bands", "Rollers"];

export default function Product() {
  const navigation = useNavigation();
  const categoryListRef = useRef(null);

  const [userDetails, setUserDetails] = useState({ initials: "", fullName: "", email: "" });
  const [likedProducts, setLikedProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Deals");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch user details on component mount
  useEffect(() => {
    const fetchDetails = async () => {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        const details = await fetchUserDetails(token);
        if (details) {
          setUserDetails(details);
        }
      }
    };
    fetchDetails();
  }, []);

  // Update filtered products when selected category changes
  useEffect(() => {
    const filtered =
      selectedCategory === "Deals"
        ? productData.filter((product) => product.deal)
        : productData.filter((product) => product.category === selectedCategory);
    setFilteredProducts(filtered);
  }, [selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const index = categories.findIndex((item) => item === category);
    if (index !== -1 && categoryListRef.current) {
      categoryListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  // Toggle like for a product
  const toggleLike = (productId) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  };

  // Render a single product card
  const renderProduct = ({ item }) => (
    <DisplaceCard
      product={item}
      isLiked={likedProducts[item.id]}
      setIsLiked={() => toggleLike(item.id)}
      onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
    />
  );

  // Render the header section
  const renderHeader = useMemo(() => (
    <>
      <TopHeader initials={userDetails.initials} style={{ color: colors.secondary }} />
      <StyledText big style={styles.headerText}>Products</StyledText>

      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={26} color="#C0C0C0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          placeholderTextColor="#C0C0C0"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        ref={categoryListRef}
        data={categories}
        renderItem={({ item }) => (
          <Catagory
            item={item}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategorySelect}
            style={[styles.category, item === selectedCategory && styles.selectedCategory]}
          />
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyboardShouldPersistTaps="handled"
      />
    </>
  ), [userDetails.initials, searchTerm, selectedCategory]);

  return (
    <MainContainer colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <FlatList
        data={filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.productList}
        keyboardShouldPersistTaps="handled"
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  headerText: {
    fontSize: 28,
    marginTop: 20,
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.placeholder,
  },
  categoryList: {
    marginBottom: 20,
  },
  category: {
    marginHorizontal: 10,
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productList: {
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
});
