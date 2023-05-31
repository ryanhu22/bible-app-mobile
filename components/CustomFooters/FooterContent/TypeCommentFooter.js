import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";

const TypeCommentFooter = ({
  underlineIds,
  hideCommentInput,
  sendComment,
  commentInput,
  setCommentInput,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={hideCommentInput}
        >
          <AntDesign name="back" size={20} color="#20c7fa" />
          <Text style={{ color: "#20c7fa" }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={sendComment}
        >
          <Feather name="send" size={18} color="#20c7fa" />
          <Text style={{ color: "#20c7fa" }}>Post</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>
          Add a comment to verses:{" "}
          {underlineIds.map((verseNum, index) => {
            return (
              <Text key={index} style={{ color: "white" }}>
                <Text style={{ fontWeight: "bold" }}>{verseNum}</Text>,{" "}
              </Text>
            );
          })}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#141414",
          margin: 20,
          padding: 15,
          height: 50,
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <TextInput
          style={{
            color: "white",
            fontSize: 15,
          }}
          multiline={true}
          autoFocus={true}
          placeholder="Write a comment..."
          placeholderTextColor={"#8d8d8d"}
          onChangeText={setCommentInput}
          value={commentInput}
        />
      </View>
    </View>
  );
};

export default TypeCommentFooter;
