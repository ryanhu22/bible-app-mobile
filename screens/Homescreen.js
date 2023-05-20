import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Passage from "../components/Passage";
import Passage2 from "../components/Passage2";

import firestore from "@react-native-firebase/firestore";

const HomeScreen = () => {
  useEffect(() => {
    search();
  }, []);

  const [passage, setPassage] = useState(null);

  const search = async () => {
    const coll = await firestore().collection("Genesis").doc("3").get();
    setPassage(coll._data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Passage2 passage={passage} />
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
