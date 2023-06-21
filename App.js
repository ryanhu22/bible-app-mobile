// IOS: 1020036933408-lrrl2g2hs3olcaa8o4g0t0t2o6e47bn4.apps.googleusercontent.com
// Android: 1020036933408-kvtunida5qb0tcsn5o6tn2tsvooj7fat.apps.googleusercontent.com

import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Homescreen";
import SignInScreen from "./screens/SignInScreen";
import Header from "./components/Header";
import Passage from "./components/Passage";
import React, { useRef, useState, useEffect } from "react";
import "react-native-url-polyfill/auto";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

function App() {
  // id, email, name, given_name (FN), family_name (LN), picture
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1020036933408-kvtunida5qb0tcsn5o6tn2tsvooj7fat.apps.googleusercontent.com",
    iosClientId:
      "1020036933408-lrrl2g2hs3olcaa8o4g0t0t2o6e47bn4.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem("@user");
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
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // Error handling
    }
  };

  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false, // hide the header for all screens
    //     }}
    //   >
    //     {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <HomeScreen />
    // <View style={{ top: 45 }}>
    //   <Text>{JSON.stringify(userInfo, null, 2)}</Text>
    //   <Button title="sign in with google" onPress={() => promptAsync()} />
    //   <Button
    //     title="delete local storage"
    //     onPress={() => AsyncStorage.removeItem("@user")}
    //   />
    // </View>
  );
}

export default App;
