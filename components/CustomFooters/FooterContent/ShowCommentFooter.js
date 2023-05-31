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

const ShowCommentFooter = ({ currVerseComment, comments }) => {
  return (
    <View style={styles.footer}>
      <Text
        style={{
          color: "white",
          fontStyle: "italic",
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Verse {currVerseComment}
      </Text>
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
