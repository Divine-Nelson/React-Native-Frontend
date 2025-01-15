import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../componets/Background'
import Logo from '../componets/Logo'
import Header from '../componets/Header'
import Button from '../componets/Button'
import TextInput from '../componets/TextInput'
import BackButton from '../componets/BackButton'
import { theme } from '../core/theme'
import { identifierValidator } from '../helper/identifierValidator'
import { passwordValidator } from '../helper/passwordValidator'
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { fetchUserDetails } from '../services/authService'

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onLoginPressed = async () => {
    const identifierError = identifierValidator(identifier.value);
    const passwordError = passwordValidator(password.value);
  
    if (identifierError || passwordError) {
      setIdentifier({ ...identifier, error: identifierError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  
    try {
      const response = await fetch("http://172.20.10.5:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.value,
          password: password.value,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        
        // Store token in AsyncStorage
        await AsyncStorage.setItem("authToken", token);
        
        // Fetch user details (initials, full name, email)
        const userDetails = await fetchUserDetails(token);

        if (userDetails) {
          // Store user details in AsyncStorage
          await AsyncStorage.setItem("userInitials", userDetails.initials);
          await AsyncStorage.setItem("userFullName", userDetails.fullName);
          await AsyncStorage.setItem("userEmail", userDetails.email);
        } else {
          console.warn("User details not available.");
          // Fallback to default values
          await AsyncStorage.setItem("userInitials", "");
          await AsyncStorage.setItem("userFullName", "");
          await AsyncStorage.setItem("userEmail", "");
        }

        Alert.alert(`Welcome Back, ${userDetails.fullName}`);
        navigation.reset({
          index: 0,
          routes: [{ name: "DashboardScreen" }],
        });
      } else {
        const errorData = await response.json();
        console.log("Error: ", errorData);
        Alert.alert("Error", errorData.error || "Login failed");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error("Fetch error:", error);
    }
  };
  
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email or Username"
        returnKeyType="next"
        value={identifier.value}
        onChangeText={(text) => setIdentifier({ value: text, error: '' })}
        error={!!identifier.error}
        errorText={identifier.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="username"
        keyboardType="default"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.down}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignupScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  down: {
    color: theme.colors.text,
  },
});
