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
import { Entypo, FontAwesome } from "@expo/vector-icons";

const ShowCommentFooter = ({ currVerseComment, comments, deleteComment }) => {
  const removeComment = () => {
    deleteComment(currVerseComment);
  };

  return (
    <View style={styles.footer}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
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
        <TouchableOpacity style={{ paddingLeft: 10 }} onPress={removeComment}>
          <FontAwesome name="trash-o" size={20} color="#ff3729" />
        </TouchableOpacity>
      </View>

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
