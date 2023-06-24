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
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileModal = ({
  userInfo,
  profileModalVisible,
  openBookmarksModal,
  closeProfileModal,
  showSignIn,
  signOut,
}) => {
  return (
    <Modal
      visible={profileModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeProfileModal}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        activeOpacity={1}
        onPress={closeProfileModal}
      >
        <TouchableOpacity
          style={{
            width: "90%",
            height: "25%",
            backgroundColor: "#302f2f",
            borderRadius: 18,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
          onPress={() => console.log()}
          activeOpacity={1}
        >
          {/* Heading */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={closeProfileModal}
              style={{ position: "absolute", left: 1 }}
            >
              <Entypo name="cross" size={20} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white" }}>Profile</Text>
          </View>

          {/* Profile Icon */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomColor: "#4a4848",
              borderBottomWidth: 1,
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 75,
                  borderWidth: 1,
                  borderColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black color
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  {userInfo
                    ? userInfo.first_name[0] + userInfo.last_name[0]
                    : "NA"}
                </Text>
              </View>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ color: "white", fontSize: 15 }}>
                  {userInfo
                    ? userInfo.first_name + " " + userInfo.last_name
                    : "Not Signed In"}
                </Text>
                <Text style={{ color: "#706f6f", fontSize: 10 }}>
                  {userInfo ? userInfo.email : "Sign in to see your profile"}
                </Text>
              </View>
            </View>
            {userInfo ? (
              <TouchableOpacity onPress={signOut}>
                <View>
                  <Text
                    style={{
                      color: "#ff7070",
                      fontSize: 12,
                      borderColor: "#ff7070",
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 4,
                    }}
                  >
                    Sign out
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={showSignIn}>
                <View>
                  <Text
                    style={{
                      color: "#007bff",
                      fontSize: 12,
                      borderColor: "#007bff",
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 4,
                    }}
                  >
                    Sign in
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {/* Rest */}
          <TouchableOpacity onPress={openBookmarksModal}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ color: "white" }}>View bookmarks</Text>

              <AntDesign name="right" size={16} style={{ color: "white" }} />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProfileModal;
