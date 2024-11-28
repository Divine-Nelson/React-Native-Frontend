import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../componets/Background'
import Logo from '../componets/Logo'
import Header from '../componets/Header'
import Button from '../componets/Button'
import TextInput from '../componets/TextInput'
import BackButton from '../componets/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helper/emailValidator'
import { passwordValidator } from '../helper/passwordValidator'
import { nameValidator } from '../helper/nameValidator'

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [username, setUsername] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [retypePassword, setRetypePassword] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const firstNameError = nameValidator(firstName.value)
    const lastNameError = nameValidator(lastName.value)
    const usernameError = username.value ? '' : 'Username cannot be empty'
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const retypePasswordError =
      password.value !== retypePassword.value ? 'Passwords do not match' : ''

    if (firstNameError || lastNameError || usernameError || emailError || passwordError || retypePasswordError) {
      setFirstName({ ...firstName, error: firstNameError })
      setLastName({ ...lastName, error: lastNameError })
      setUsername({ ...username, error: usernameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setRetypePassword({ ...retypePassword, error: retypePasswordError })
      return
    }

    try {
      const response = await fetch('http://192.168.0.25:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName.value, // Updated to match backend
          last_name: lastName.value, // Updated to match backend
          username: username.value,
          email: email.value,
          password1: password.value,
          password2: retypePassword.value,
        }),
      })

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!')
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      } else {
        const errorText = await response.text() // Fallback to plain text
        let errorMessage

        try {
          const errorData = JSON.parse(errorText) // Attempt to parse JSON
          errorMessage = Object.entries(errorData)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')
        } catch {
          errorMessage = errorText // Use raw text if not JSON
        }

        Alert.alert('Error', errorMessage || 'Failed to create account')
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.')
      console.error(error)
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCompleteType="off"
        textContentType="none"
      />
      <TextInput
        label="Re-type Password"
        returnKeyType="done"
        value={retypePassword.value}
        onChangeText={(text) => setRetypePassword({ value: text, error: '' })}
        error={!!retypePassword.error}
        errorText={retypePassword.error}
        secureTextEntry
        autoCompleteType="off"
        textContentType="none"
      />
      <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text style={styles.down}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  down: {
    color: theme.colors.text,
  },
})
