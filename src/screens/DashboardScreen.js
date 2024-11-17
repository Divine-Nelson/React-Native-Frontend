import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../componets/Button';
import Background from '../componets/Background';
import Logo from '../componets/Logo';
import { theme } from '../core/theme';

export default function DashboardScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            // Clear any stored user data if applicable
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Background>
      <Logo />
      <Text style={styles.header}>Welcome to the Dashboard!</Text>
      <Text style={styles.text}>
        You have successfully logged in. Explore the features of your app here.
      </Text>
      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
