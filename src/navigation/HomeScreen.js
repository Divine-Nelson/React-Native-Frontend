import React, { useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY } from '../core/constant';
import StyledText from '../componets/Texts/StyledText';
import { colors } from '../core/theme';
import AutoScrollFlatList from './Productfolder/AutoScroll';
import { machinesData, popularMachines } from '../data';
import Icon from 'react-native-ico-basic';
import DisplaceMachine from './Productfolder/DisplayMachine';
import { TopHeader } from '../componets/SectionHeader';
import { ScreenHeight, ScreenWidth } from '../core/constant';
import { fetchUserDetails } from '../services/authService';
//import * as Zendesk from 'react-native-zendesk-messaging';
//import * as Zendesk from 'expo-zendesk'

export default function HomeScreen({ isHomeScreen = true }) {
  const [userDetails, setUserDetails] = useState({ initials: "", fullName: "", email: "" });

  /*
  useEffect(() => {
    Zendesk.initialize("eyJzZXR0aW5nc191cmwiOiJodHRwczovL3VuaXZlcnNpdHl3ZXN0LnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSkc0OEc2UVlGRFNHQks0UDlLWEdXMlM5Lmpzb24ifQ==")

  }, []);*/

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

  const renderProduct = ({ item }) => (
    <View>
      <DisplaceMachine product={item} />
    </View>
  );

  const ListHeader = () => (
    <>
      {/* Header Section */}
      <View style={styles.flexRow}>
        <TopHeader isHomeScreen={true} fullName={userDetails.fullName} />
      </View>

      {/* Auto-Scrolling Images Section */}
      <View style={{ marginTop: 20 }}>
        <AutoScrollFlatList data={machinesData} />
      </View>

      {/* Popular Machines Section Header */}
      <View style={styles.row}>
        <StyledText bold style={styles.rowText}>
          Our popular machines{" "}
          <Icon name="gym" size={17} color={colors.accent + "cc"} />
        </StyledText>
      </View>
    </>
  );

  const ListFooter = () => (
    <>
      {/* Group Training Section */}
      <View style={styles.sectionContainer}>
        <StyledText bold style={styles.sectionTitle}>
          We offer group training also
        </StyledText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            source={require("../assets/Designer.png")}
            style={styles.sectionImage}
          />
          <Image
            source={require("../assets/group1.png")}
            style={styles.sectionImage}
          />
        </ScrollView>
      </View>

      {/* Other Activities Section */}
      <View style={styles.sectionContainer}>
        <StyledText bold style={styles.sectionTitle}>
          Other activities we offer
        </StyledText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            source={require("../assets/Designer.png")}
            style={styles.sectionImage}
          />
          <Image
            source={require("../assets/group1.png")}
            style={styles.sectionImage}
          />
        </ScrollView>
      </View>
    </>
  );

  const ChatBotButton = () => (
    <TouchableOpacity
      /*onPress={() => Zendesk.openMessagingView()}*/
      style={styles.chatBotButton}
    >
      <Image
        style={styles.chatBotImage}
        source={require("../assets/chatbot.png")}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={popularMachines}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={ListHeader} // Header section
        ListFooterComponent={ListFooter} // Footer section
      />
      {/* Chatbot Button */}
      <ChatBotButton />
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 5,
    marginBottom: 15,
    color: colors.accent + "cc",
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.black,
  },
  sectionImage: {
    height: ScreenHeight * 0.4,
    width: ScreenWidth * 0.9,
    resizeMode: "cover",
    borderRadius: 8,
    marginHorizontal: 5, // Add spacing between images
  },
  chatBotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    backgroundColor: colors.black,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBotImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
