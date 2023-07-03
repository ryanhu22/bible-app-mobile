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
import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";

const SelectionFooter = ({
  underlineIds,
  highlightYellow,
  highlightBlue,
  highlightPink,
  highlightGreen,
  highlightPurple,
  highlightOrange,
  highlightRed,
  removeHighlight,
  showCommentInput,
  showExplain,
  showAI,
}) => {
  return (
    <View style={styles.footer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text style={{ color: "white" }}>
          Selected verses:{" "}
          {underlineIds.map((verseNum, index) => {
            return (
              <Text key={index} style={{ color: "white" }}>
                <Text style={{ fontWeight: "bold" }}>{verseNum}</Text>,{" "}
              </Text>
            );
          })}
        </Text>
      </View>
      <View style={styles.topHalf}>
        <FontAwesome5
          name="highlighter"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <View style={styles.colorContainer}>
          {/* Yellow */}
          <TouchableOpacity onPress={highlightYellow}>
            <View
              style={{
                backgroundColor: "#f2ef88",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
            ></View>
          </TouchableOpacity>
          {/* Blue */}
          <TouchableOpacity onPress={highlightBlue}>
            <View
              style={{
                backgroundColor: "#55cef2",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
            ></View>
          </TouchableOpacity>
          {/* Pink */}
          <TouchableOpacity onPress={highlightPink}>
            <View
              style={{
                backgroundColor: "#fc65a7",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
            ></View>
          </TouchableOpacity>
          {/* Green */}
          <TouchableOpacity onPress={highlightGreen}>
            <View
              style={{
                backgroundColor: "#63ff6e",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
            ></View>
          </TouchableOpacity>
          {/* Purple */}
          <TouchableOpacity onPress={highlightPurple}>
            <View
              style={{
                backgroundColor: "#c66bfa",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
            ></View>
          </TouchableOpacity>
          {/* Orange */}
          <TouchableOpacity onPress={highlightOrange}>
            <View
              style={{
                backgroundColor: "#faa466",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
            ></View>
          </TouchableOpacity>
          {/* Red */}
          <TouchableOpacity onPress={highlightRed}>
            <View
              style={{
                backgroundColor: "#ff2e4d",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
            ></View>
          </TouchableOpacity>
          {/* Gray */}
          <TouchableOpacity onPress={removeHighlight}>
            <View
              style={{
                backgroundColor: "#cccaca",
                borderColor: "black",
                borderWidth: 1,
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15 }}>x</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <TouchableOpacity onPress={showCommentInput}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <SimpleLineIcons
              name="note"
              size={24}
              color="white"
              style={{ paddingBottom: 5 }}
            />
            <Text style={{ color: "white" }}>Note</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={showExplain}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Ionicons
              name="color-wand"
              size={24}
              color="white"
              style={{ paddingBottom: 5 }}
            />
            <Text style={{ color: "white" }}>Explain</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={showAI}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color="white"
              style={{ paddingBottom: 5 }}
            />
            <Text style={{ color: "white" }}>Ask an AI</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  topHalf: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#c3c3c3",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  colorContainer: {
    flexDirection: "row",
  },
  colorCircleYellow: {
    backgroundColor: "#f2ef88",
    borderColor: "black",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  colorCircleBlue: {
    backgroundColor: "#3ba3ff",
    borderColor: "black",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  colorCircleGreen: {
    backgroundColor: "#23fc81",
    borderColor: "black",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  colorCircleRed: {
    backgroundColor: "#ff4d6a",
    borderColor: "black",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  bottomHalf: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

export default SelectionFooter;
