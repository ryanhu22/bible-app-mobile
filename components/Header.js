import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const booksOT = [
  { id: "gen", name: "Genesis" },
  { id: "exod", name: "Exodus" },
  { id: "lev", name: "Leviticus" },
  { id: "num", name: "Numbers" },
  { id: "deut", name: "Deuteronomy" },
  { id: "josh", name: "Joshua" },
  { id: "judg", name: "Judges" },
  { id: "ruth", name: "Ruth" },
  { id: "1sam", name: "1 Samuel" },
  { id: "2sam", name: "2 Samuel" },
  { id: "1kgs", name: "1 Kings" },
  { id: "2kgs", name: "2 Kings" },
  { id: "1chr", name: "1 Chronicles" },
  { id: "2chr", name: "2 Chronicles" },
  { id: "ezra", name: "Ezra" },
  { id: "neh", name: "Nehemiah" },
  { id: "esth", name: "Esther" },
  { id: "job", name: "Job" },
  { id: "ps", name: "Psalms" },
  { id: "prov", name: "Proverbs" },
  { id: "ecc", name: "Ecclesiastes" },
  { id: "song", name: "Song of Solomon" },
  { id: "isa", name: "Isaiah" },
  { id: "jer", name: "Jeremiah" },
  { id: "lam", name: "Lamentations" },
  { id: "ezek", name: "Ezekiel" },
  { id: "dan", name: "Daniel" },
  { id: "hos", name: "Hosea" },
  { id: "joel", name: "Joel" },
  { id: "amos", name: "Amos" },
  { id: "obad", name: "Obadiah" },
  { id: "jonah", name: "Jonah" },
  { id: "mic", name: "Micah" },
  { id: "nah", name: "Nahum" },
  { id: "hab", name: "Habakkuk" },
  { id: "zeph", name: "Zephaniah" },
  { id: "hag", name: "Haggai" },
  { id: "zech", name: "Zechariah" },
  { id: "mal", name: "Malachi" },
];

const booksNT = [
  { id: "mat", name: "Matthew" },
  { id: "mark", name: "Mark" },
  { id: "luke", name: "Luke" },
  { id: "john", name: "John" },
  { id: "acts", name: "Acts" },
  { id: "rom", name: "Romans" },
  { id: "1cor", name: "1 Corinthians" },
  { id: "2cor", name: "2 Corinthians" },
  { id: "gal", name: "Galatians" },
  { id: "eph", name: "Ephesians" },
  { id: "phil", name: "Philippians" },
  { id: "col", name: "Colossians" },
  { id: "1thes", name: "1 Thessalonians" },
  { id: "2thes", name: "2 Thessalonians" },
  { id: "1tim", name: "1 Timothy" },
  { id: "2tim", name: "2 Timothy" },
  { id: "titus", name: "Titus" },
  { id: "phlm", name: "Philemon" },
  { id: "heb", name: "Hebrews" },
  { id: "jas", name: "James" },
  { id: "1pet", name: "1 Peter" },
  { id: "2pet", name: "2 Peter" },
  { id: "1john", name: "1 John" },
  { id: "2john", name: "2 John" },
  { id: "3john", name: "3 John" },
  { id: "jude", name: "Jude" },
  { id: "rev", name: "Revelation" },
];

const bookCutoffs = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  "Song of Solomon": 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 ohn": 1,
  Jude: 1,
  Revelation: 22,
};

const Header = ({ book, chapter, search }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(!modalVisible);
  };

  const searchAndClose = (book, chapter) => {
    setModalVisible(false);
    search(book.toLowerCase().replace(/\s/g, ""), chapter);
  };

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
                  color: "#fff",
                  fontSize: 16,
                  marginBottom: 3,
                  paddingLeft: 6,
                },
                book === bookName && { color: "#bfbfbf" },
              ]}
            >
              {bookName}
            </Text>
            {isOpen ? (
              <AntDesign
                name="up"
                size={16}
                color={book === bookName ? "#bfbfbf" : "white"}
                style={{ paddingRight: 6 }}
              />
            ) : (
              <AntDesign
                name="down"
                size={16}
                color={book === bookName ? "#bfbfbf" : "white"}
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
                    borderColor: "white",
                    borderWidth: 0.5,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "16%",
                    margin: 7,
                    borderRadius: 10,
                    height: 40,
                  },
                  book === bookName &&
                    chapter === chp && { borderColor: "#bfbfbf" },
                ]}
              >
                <Text
                  style={[
                    { color: "white" },
                    book === bookName &&
                      chapter === chp && { color: "#bfbfbf" },
                  ]}
                >
                  {chp}
                </Text>
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

  const BibleGrid = () => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height - 100;

    const [isOT, setIsOT] = useState(
      booksOT.some((obj) => obj.name.includes(book))
    );

    return (
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <ScrollView>
          {isOT ? <Section books={booksOT} /> : <Section books={booksNT} />}
        </ScrollView>

        {/* Footer */}
        <View style={{ height: 70, marginTop: 10 }}>
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
      </View>
    );
  };

  return (
    <View style={{}}>
      {/* Header Banner */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
        }}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={{ color: "white", position: "absolute", left: 15 }}
        >
          <MaterialCommunityIcons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 18 }}>
          {book} {chapter.toString()}
        </Text>
      </View>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handlePress}
        transparent={false}
      >
        <SafeAreaView style={{ backgroundColor: "black" }}>
          {/* Modal Header Banner */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
          >
            <TouchableOpacity
              onPress={handlePress}
              style={{ position: "absolute", left: 15 }}
            >
              <Text style={{ color: "white", textDecorationLine: "underline" }}>
                Close
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 18 }}>Selection</Text>
          </View>

          <View>
            <BibleGrid />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Header;
