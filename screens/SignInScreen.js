import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import React, { useRef, useState, useEffect } from "react";

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
        style={{
          color: "white",
          fontSize: 15,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 4,
          padding: 8,
          marginBottom: 16,
          height: 40,
          width: "100%",
        }}
        placeholder="Email"
        placeholderTextColor={"white"}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={{
          color: "white",
          fontSize: 15,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 4,
          padding: 8,
          marginBottom: 16,
          height: 40,
          width: "100%",
        }}
        placeholder="Password"
        placeholderTextColor={"white"}
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
    backgroundColor: "gray",
  },
});

export default SignInScreen;
