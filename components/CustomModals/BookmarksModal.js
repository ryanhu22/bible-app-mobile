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

const BookmarksModal = ({
  bookmarks,
  userInfo,
  booksOT,
  booksNT,
  bookCutoffs,
  bookmarksModalVisible,
  closeBookmarksModal,
}) => {
  const BookButton = ({ bookName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const entries = Array.from(Array(bookCutoffs[bookName]).keys()).map(
      (num) => num + 1
    );

    const handlePress = () => {
      setIsOpen(!isOpen);
    };

    return (
      <View
        style={{
          marginVertical: 9,
          borderBottomWidth: 0.5,
          borderBottomColor: "#fff",
        }}
      >
        <TouchableOpacity onPress={handlePress}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                {
                  color: "#525151",
                  fontSize: 16,
                  marginBottom: 3,
                  paddingLeft: 6,
                },
                bookmarks.hasOwnProperty(bookName) && { color: "white" },
              ]}
            >
              {bookName}
            </Text>
            {isOpen ? (
              <AntDesign
                name="up"
                size={16}
                color={bookmarks.hasOwnProperty(bookName) ? "white" : "#525151"}
                style={{ paddingRight: 6 }}
              />
            ) : (
              <AntDesign
                name="down"
                size={16}
                color={bookmarks.hasOwnProperty(bookName) ? "white" : "#525151"}
                style={{ paddingRight: 6 }}
              />
            )}
          </View>
        </TouchableOpacity>
        {isOpen ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            {entries.map((chp) => (
              <TouchableOpacity
                key={chp}
                onPress={() => searchAndClose(bookName, chp)}
                style={[
                  {
                    borderColor: "#525151",
                    borderWidth: 0.5,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "16%",
                    margin: 7,
                    borderRadius: 10,
                    height: 40,
                  },
                  bookmarks.hasOwnProperty(bookName) &&
                    bookmarks[bookName]["Chapters"].includes(chp) && {
                      borderColor: "white",
                    },
                ]}
              >
                {bookmarks.hasOwnProperty(bookName) &&
                bookmarks[bookName]["Chapters"].includes(chp) ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Ionicons
                      name="ios-bookmark"
                      size={15}
                      color="white"
                      style={{ paddingRight: 3 }}
                    />
                    <Text style={{ color: "white" }}>{chp}</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={{ color: "#525151" }}>{chp}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
    );
  };

  const Section = ({ books }) => {
    return (
      <View>
        {books.map((book) => {
          return <BookButton key={book.id} bookName={book.name} />;
        })}
      </View>
    );
  };

  const Footer = ({ isOT, setIsOT }) => {
    return (
      <View style={{ height: 50, marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsOT(true)}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Text
              style={{
                color: isOT ? "white" : "gray",
                fontWeight: "bold",
                textDecorationLine: isOT ? "underline" : "none",
              }}
            >
              Old Testament
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsOT(false)}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Text
              style={{
                color: !isOT ? "white" : "gray",
                fontWeight: "bold",
                textDecorationLine: !isOT ? "underline" : "none",
              }}
            >
              New Testament
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const BibleGrid = () => {
    const [isOT, setIsOT] = useState(true);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {isOT ? <Section books={booksOT} /> : <Section books={booksNT} />}
        </ScrollView>

        <Footer isOT={isOT} setIsOT={setIsOT} />
      </View>
    );
  };

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
          onPress={() => console.log()}
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

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Your Bookmarks
            </Text>
          </View>

          {/* Grid */}
          <View style={{ flex: 1 }}>
            <BibleGrid />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BookmarksModal;
