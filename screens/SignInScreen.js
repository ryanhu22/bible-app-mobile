import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createProfile = async (response) => {
    db().ref(`/users/${response.user.uid}`).set({ email });
  };

  const handleSignIn = async () => {
    // Handle sign-in logic here
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        if (response.user) {
          await createProfile(response);
          navigation.navigate("Home");
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Oops", "Please check your form and try again");
      }
    }
    // For example, authenticate user with Firebase
    // If successful, navigate to home screen
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default SignInScreen;
