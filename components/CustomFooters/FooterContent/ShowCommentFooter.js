import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const ShowCommentFooter = ({ currVerseComment, comments }) => {
  return (
    <View style={styles.footer}>
      {/* Header */}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Verse {currVerseComment}
        </Text>
        <Entypo name="cross" size={34} color="white" />
      </View> */}

      <ScrollView>
        <Text style={{ color: "white", marginTop: 5 }}>
          {comments[currVerseComment]}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default ShowCommentFooter;
