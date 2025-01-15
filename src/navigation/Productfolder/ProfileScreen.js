import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MainContainer from "../../componets/Container/MainContainer";
import StyledText from "../../componets/Texts/StyledText";
import { colors } from "../../core/theme";
import { TopHeader } from "../../componets/SectionHeader";
import ProfileInfo from "../../componets/Texts/ProfileInfo";
import { AntDesign } from "@expo/vector-icons";
import DisplaceCard from "./DisplaceCard";
import { SavedProductsContext } from "../../utils/context";
import { ScreenWidth } from "../../core/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserDetails } from "../../services/authService";
import { AUTH_TOKEN_KEY } from "../../core/constant";


const Profile = () => {
  const navigation = useNavigation();
  const activeUser = {
    Fullname: "Nelson Najme",
    email: "mosavi@gmail.com",
    address: "No. 39, Muskotgatan Angered",
  };

  const { savedProducts } = useContext(SavedProductsContext);
  const [userDetails, setUserDetails] = useState({
    initials: "",
    fullName: "",
    email: "",
  });


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
  

  // Filter and validate savedProducts
  const validSavedProducts = savedProducts.filter(
    (product) => product && product.id // Ensure valid object and ID
  );

  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { id: item.id })
        }
      >
        <DisplaceCard product={item} />
      </TouchableOpacity>
    );
  };

  return (
    <MainContainer style={styles.container}>
      <TopHeader initials={userDetails.initials} style={{ color: colors.secondary }} />
      <StyledText style={styles.header} bold>
        Account
      </StyledText>

      <ProfileInfo icon="user" label="Full Name">
        {userDetails.fullName}
      </ProfileInfo>
      <ProfileInfo icon="mail" label="Email">
        {userDetails.email}
      </ProfileInfo>

      <TouchableOpacity style={styles.row}>
        <StyledText style={styles.rowText} bold>
          My Bookings
        </StyledText>
        <AntDesign name="right" size={16} color="#999" />
      </TouchableOpacity>

      <StyledText style={styles.header} bold>
        Wishlist{" "}
        <AntDesign name="heart" size={17} color={colors.accent + "cc"} />
      </StyledText>

      {validSavedProducts.length === 0 && (
        <View style={styles.emptyWish}>
          <AntDesign
            name="hearto"
            size={ScreenWidth * 0.4}
            color={colors.tertiary + "55"}
            style={{ marginBottom: 30 }}
          />
          <StyledText big>Your Wishlist is empty</StyledText>
          <StyledText style={styles.emptyWishText}>
            No item found in your wishlist
          </StyledText>
        </View>
      )}

      {validSavedProducts.length > 0 && (
        <FlatList
          data={validSavedProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id?.toString()} // Handle undefined ID
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 25,
          }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 5,
    marginBottom: 15,
    color: colors.accent + "cc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowText: {
    fontSize: 16,
    color: "#333",
  },
  emptyWish: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyWishText: {
    color: colors.tertiary,
    marginTop: 5,
  },
});

export default Profile;
