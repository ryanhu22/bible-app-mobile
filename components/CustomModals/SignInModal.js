import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  Pressable,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import GoogleLogo from "./google-logo.png";
import { FontAwesome5 } from "@expo/vector-icons";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import React, { useRef, useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const SignInModal = ({ signInModalVisible, closeSignInModal, setProfile }) => {
  // id, email, name, given_name (FN), family_name (LN), picture
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1020036933408-kvtunida5qb0tcsn5o6tn2tsvooj7fat.apps.googleusercontent.com",
    iosClientId:
      "1020036933408-lrrl2g2hs3olcaa8o4g0t0t2o6e47bn4.apps.googleusercontent.com",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignInModal, setIsSignInModal] = useState(true);

  // Google Sign on
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    // AsyncStorage.removeItem("@user");

    // Uncomment out below line to prevent continuously signing in (not a big deal though)
    // const user = await AsyncStorage.getItem("@user");
    const user = null;
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      const uid = user.id;
      const firstName = user.given_name;
      const lastName = user.family_name;
      const email = user.email;
      const picture = user.picture;

      var account_exists = await db().ref(`/users/${uid}`);
      if (!account_exists) {
        await db()
          .ref(`/users/${uid}`)
          .set({ firstName, lastName, email, picture });
      }

      const user_parsed = {
        uid: uid,
        first_name: firstName,
        last_name: lastName,
        email: email,
        picture: picture,
      };
      await AsyncStorage.setItem("@user", JSON.stringify(user_parsed));
      setUserInfo(user_parsed);
      finishProcess(user_parsed);
    } catch (error) {
      console.log(error);
      // Error handling
    }
  };

  // Other Sign on
  const handleRegister = async () => {
    // Handle sign-in logic here
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        if (response.user) {
          const uid = response.user.uid;
          var account_exists = await db().ref(`/users/${uid}`);
          if (!account_exists) {
            // Create user on firestore
            await db().ref(`/users/${uid}`).set({ firstName, lastName, email });
          }
          // Save user info to async storage
          const user_parsed = {
            uid: uid,
            first_name: firstName,
            last_name: lastName,
            email: email,
            picture: null,
          };
          await AsyncStorage.setItem("@user", JSON.stringify(user_parsed));
          setUserInfo(user_parsed);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          console.log("Success in registering an account!");
          finishProcess(user_parsed);
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Oops", "Please check your form and try again");
      }
    }

    // For example, authenticate user with Firebase
    // If successful, navigate to home screen
  };

  const handleSignIn = async () => {
    // Handle sign-in logic here
    if (email && password) {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password
        );

        var user = null;
        const uid = response.user.uid;

        await db()
          .ref(`/users/${uid}`)
          .once("value")
          .then((snapshot) => {
            user = snapshot.val();
          });

        if (user) {
          // Save user info to async storage
          const user_parsed = {
            uid: uid,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            picture: null,
          };
          await AsyncStorage.setItem("@user", JSON.stringify(user_parsed));
          setUserInfo(user_parsed);
          setEmail("");
          setPassword("");
          console.log("Success in signing in!");
          finishProcess(user_parsed);
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Oops", "Please check your form and try again");
      }
    }

    // For example, authenticate user with Firebase
    // If successful, navigate to home screen
  };

  const finishProcess = (userInfo) => {
    setProfile(userInfo);
    closeSignInModal();
  };

  const changeToSignIn = () => {
    setIsSignInModal(true);
  };

  const changeToRegister = () => {
    setIsSignInModal(false);
  };

  return (
    <Modal
      visible={signInModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeSignInModal}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        activeOpacity={1}
        onPress={closeSignInModal}
      >
        <TouchableOpacity
          style={{
            width: "90%",
            height: "75%",
            backgroundColor: "#302f2f",
            borderRadius: 18,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
          onPress={() => console.log()}
          activeOpacity={1}
        >
          {/* Heading */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 16,
            }}
          >
            <TouchableOpacity
              onPress={closeSignInModal}
              style={{ position: "absolute", left: 1 }}
            >
              <Entypo name="cross" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Sign in Description */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 16,
            }}
          >
            {isSignInModal ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                Sign in to your account
              </Text>
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                Create an account
              </Text>
            )}
          </View>

          {/* Rest of sign-in */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            {isSignInModal ? null : (
              <View style={{ width: "100%" }}>
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
                  autoCapitalize="none"
                  placeholder="First Name (ex: John)"
                  placeholderTextColor={"white"}
                  onChangeText={setFirstName}
                  value={firstName}
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
                  autoCapitalize="none"
                  placeholder="Last Name (ex: Doe)"
                  placeholderTextColor={"white"}
                  onChangeText={setLastName}
                  value={lastName}
                />
              </View>
            )}

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
              autoCapitalize="none"
              placeholder="Email (ex: johndoe@gmail.com)"
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

            {isSignInModal ? (
              <TouchableOpacity
                style={{
                  width: "100%",
                  margin: 10,
                  borderRadius: 4,
                  backgroundColor: "#007bff",
                  padding: 8,
                  marginBottom: 16,
                  height: 40,
                  alignItems: "center",
                }}
                onPress={handleSignIn}
              >
                <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  width: "100%",
                  margin: 10,
                  borderRadius: 4,
                  backgroundColor: "#007bff",
                  padding: 8,
                  marginBottom: 16,
                  height: 40,
                  alignItems: "center",
                }}
                onPress={handleRegister}
              >
                <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
                  Register
                </Text>
              </TouchableOpacity>
            )}

            {/* ------ OR -------- */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                OR
              </Text>
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
            </View>
            {/* Google Sign in */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: "black",
                borderRadius: 5,
                borderWidth: 1,
                padding: 6,
                backgroundColor: "#e3dede",
                margin: 10,
                width: "100%",
                justifyContent: "center",
              }}
              onPress={() => promptAsync()}
            >
              <Image source={GoogleLogo} style={{ width: 25, height: 25 }} />
              <Text style={{ color: "black" }}> Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          {isSignInModal ? (
            <View
              style={{
                marginVertical: 35,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white" }}>Don't have an account? </Text>
              <TouchableOpacity onPress={changeToRegister}>
                <Text style={{ color: "#007bff" }}>Register</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                marginVertical: 35,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white" }}>Have an account? </Text>
              <TouchableOpacity onPress={changeToSignIn}>
                <Text style={{ color: "#007bff" }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default SignInModal;
