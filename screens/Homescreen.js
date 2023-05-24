import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Passage from "../components/Passage";

import firestore from "@react-native-firebase/firestore";

const HomeScreen = () => {
  useEffect(() => {
    search();
  }, []);

  const [passage, setPassage] = useState([]);
  //   console.log(passage);

  const search = async () => {
    // Fetch data
    const query = await firestore().collection("Genesis").doc("8").get();
    const passage_data = query._data;

    // Construct passage array
    var passage_array = [];
    const sorted_passage_data = Object.keys(passage_data).sort();
    var tmp_array = [];
    var final_array = [];
    var key = 0;
    for (const sortedKey of sorted_passage_data) {
      var currentElement = passage_data[sortedKey];
      currentElement.key = key;
      key += 1;

      if (currentElement?.isHeading && currentElement.isHeading === "True") {
        if (tmp_array.length > 0) {
          var regularText = [];
          // Render out the tags
          tmp_array.map((item) => {
            const item_verse_num = item.verseNum;
            const item_verse = item.verse;
            const item_key = item.key;
            var item_tuple = [item_verse_num, item_verse, item_key];
            regularText.push(item_tuple);
          });
          tmp_array = [];
          final_array.push(regularText);
        }
        // Render out heading
        var headerText = [-1, currentElement.verse, currentElement.key];
        final_array.push(headerText);
        continue;
      } else {
        tmp_array.push(currentElement);
      }

      if (
        currentElement.isEndParagraph &&
        currentElement.isEndParagraph === "True"
      ) {
        var regularText = [];
        tmp_array.map((item) => {
          const item_verse_num = item.verseNum;
          const item_verse = item.verse;
          const item_key = item.key;
          var item_tuple = [item_verse_num, item_verse, item_key];
          regularText.push(item_tuple);
        });
        tmp_array = [];
        final_array.push(regularText);
      }
    }
    if (tmp_array.length > 0) {
      var regularText = [];
      tmp_array.map((item) => {
        const item_verse_num = item.verseNum;
        const item_verse = item.verse;
        const item_key = item.key;
        var item_tuple = [item_verse_num, item_verse, item_key];
        regularText.push(item_tuple);
      });
      tmp_array = [];
      final_array.push(regularText);
    }

    setPassage(final_array);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Passage passage={passage} />
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
