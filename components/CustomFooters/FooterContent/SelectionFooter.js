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

const SelectionFooter = ({ highlightYellow, showCommentInput }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.topHalf}>
        <FontAwesome5
          name="highlighter"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <View style={styles.colorContainer}>
          <TouchableOpacity onPress={highlightYellow}>
            <View style={styles.colorCircleYellow}></View>
          </TouchableOpacity>
          <View style={styles.colorCircleBlue}></View>
          <View style={styles.colorCircleGreen}></View>
          <View style={styles.colorCircleRed}></View>
          <TouchableOpacity onPress={highlightYellow}>
            <View style={styles.colorCircleYellow}></View>
          </TouchableOpacity>
          <View style={styles.colorCircleBlue}></View>
          <View style={styles.colorCircleGreen}></View>
          <View style={styles.colorCircleRed}></View>
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
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Ionicons
            name="color-wand"
            size={24}
            color="white"
            style={{ paddingBottom: 5 }}
          />
          <Text style={{ color: "white" }}>Explain</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={24}
            color="white"
            style={{ paddingBottom: 5 }}
          />
          <Text style={{ color: "white" }}>Ask an AI</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
