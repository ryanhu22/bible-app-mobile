import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React from "react";
import Header from "../components/Header";
import Passage from "../components/Passage";
import Passage2 from "../components/Passage2";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Passage2 />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
