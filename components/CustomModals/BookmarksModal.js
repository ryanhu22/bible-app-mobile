import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  Pressable,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import GoogleLogo from "./google-logo.png";
import { FontAwesome5 } from "@expo/vector-icons";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import React, { useRef, useState, useEffect } from "react";

const BookmarksModal = ({ bookmarksModalVisible, closeBookmarksModal }) => {
  return (
    <Modal
      visible={bookmarksModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={bookmarksModalVisible}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        activeOpacity={1}
        onPress={closeBookmarksModal}
      >
        <TouchableOpacity
          style={{
            width: "90%",
            height: "75%",
            backgroundColor: "#302f2f",
            borderRadius: 18,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
          onPress={() => console.log("HERE")}
          activeOpacity={1}
        >
          {/* Heading */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 16,
            }}
          >
            <TouchableOpacity
              onPress={closeBookmarksModal}
              style={{ position: "absolute", left: 1 }}
            >
              <Entypo name="cross" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View>
            <Text>TESTING</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BookmarksModal;
