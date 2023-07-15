import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Header from "../components/Header";
import Passage from "../components/Passage";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";

const HomeScreen = () => {
  // bibleBooks: songofsolomon -> Song of Solomon
  const bibleBooks = {
    genesis: "Genesis",
    exodus: "Exodus",
    leviticus: "Leviticus",
    numbers: "Numbers",
    deuteronomy: "Deuteronomy",
    joshua: "Joshua",
    judges: "Judges",
    ruth: "Ruth",
    samuel: "1 Samuel",
    kings: "1 Kings",
    chronicles: "1 Chronicles",
    ezra: "Ezra",
    nehemiah: "Nehemiah",
    esther: "Esther",
    job: "Job",
    psalms: "Psalms",
    proverbs: "Proverbs",
    ecclesiastes: "Ecclesiastes",
    songofsolomon: "Song of Solomon",
    isaiah: "Isaiah",
    jeremiah: "Jeremiah",
    lamentations: "Lamentations",
    ezekiel: "Ezekiel",
    daniel: "Daniel",
    hosea: "Hosea",
    joel: "Joel",
    amos: "Amos",
    obadiah: "Obadiah",
    jonah: "Jonah",
    micah: "Micah",
    nahum: "Nahum",
    habakkuk: "Habakkuk",
    zephaniah: "Zephaniah",
    haggai: "Haggai",
    zechariah: "Zechariah",
    malachi: "Malachi",
    matthew: "Matthew",
    mark: "Mark",
    luke: "Luke",
    john: "John",
    acts: "Acts",
    romans: "Romans",
    "1corinthians": "1 Corinthians",
    "2corinthians": "2 Corinthians",
    galatians: "Galatians",
    ephesians: "Ephesians",
    philippians: "Philippians",
    colossians: "Colossians",
    "1thessalonians": "1 Thessalonians",
    "2thessalonians": "2 Thessalonians",
    "1timothy": "1 Timothy",
    "2timothy": "2 Timothy",
    titus: "Titus",
    philemon: "Philemon",
    hebrews: "Hebrews",
    james: "James",
    "1peter": "1 Peter",
    "2peter": "2 Peter",
    "1john": "1 John",
    "2john": "2 John",
    "3john": "3 John",
    jude: "Jude",
    revelation: "Revelation",
  };

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

  // bookOrder[book][0] -> previous book
  // bookOrder[book][1] -> next book
  const bookOrder = {
    genesis: ["revelation", "exodus"],
    exodus: ["genesis", "leviticus"],
    leviticus: ["exodus", "numbers"],
    numbers: ["leviticus", "deuteronomy"],
    deuteronomy: ["numbers", "joshua"],
    joshua: ["deuteronomy", "judges"],
    judges: ["joshua", "ruth"],
    ruth: ["judges", "1samuel"],
    "1samuel": ["ruth", "2samuel"],
    "2samuel": ["1samuel", "1kings"],
    "1kings": ["2samuel", "2kings"],
    "2kings": ["1kings", "1chronicles"],
    "1chronicles": ["2kings", "2chronicles"],
    "2chronicles": ["1chronicles", "ezra"],
    ezra: ["2chronicles", "nehemiah"],
    nehemiah: ["ezra", "esther"],
    esther: ["nehemiah", "job"],
    job: ["esther", "psalms"],
    psalms: ["job", "proverbs"],
    proverbs: ["psalms", "ecclesiastes"],
    ecclesiastes: ["proverbs", "songofsolomon"],
    songofsolomon: ["ecclesiastes", "isaiah"],
    isaiah: ["songofsolomon", "jeremiah"],
    jeremiah: ["isaiah", "lamentations"],
    lamentations: ["jeremiah", "ezekiel"],
    ezekiel: ["lamentations", "daniel"],
    daniel: ["ezekiel", "hosea"],
    hosea: ["daniel", "joel"],
    joel: ["hosea", "amos"],
    amos: ["joel", "obadiah"],
    obadiah: ["amos", "jonah"],
    jonah: ["obadiah", "micah"],
    micah: ["jonah", "nahum"],
    nahum: ["micah", "habakkuk"],
    habakkuk: ["nahum", "zephaniah"],
    zephaniah: ["habakkuk", "haggai"],
    haggai: ["zephaniah", "zechariah"],
    zechariah: ["haggai", "malachi"],
    malachi: ["zechariah", "matthew"],
    matthew: ["malachi", "mark"],
    mark: ["matthew", "luke"],
    luke: ["mark", "john"],
    john: ["luke", "acts"],
    acts: ["john", "romans"],
    romans: ["acts", "1corinthians"],
    "1corinthians": ["romans", "2corinthians"],
    "2corinthians": ["1corinthians", "galatians"],
    galatians: ["2corinthians", "ephesians"],
    ephesians: ["galatians", "philippians"],
    philippians: ["ephesians", "colossians"],
    colossians: ["philippians", "1thessalonians"],
    "1thessalonians": ["colossians", "2thessalonians"],
    "2thessalonians": ["1thessalonians", "1timothy"],
    "1timothy": ["2thessalonians", "2timothy"],
    "2timothy": ["1timothy", "titus"],
    titus: ["2timothy", "philemon"],
    philemon: ["titus", "hebrews"],
    hebrews: ["philemon", "james"],
    james: ["hebrews", "1peter"],
    "1peter": ["james", "2peter"],
    "2peter": ["1peter", "1john"],
    "1john": ["2peter", "2john"],
    "2john": ["1john", "3john"],
    "3john": ["2john", "jude"],
    jude: ["3john", "revelation"],
    revelation: ["jude", "genesis"],
  };

  // Swiping functionality
  const swipeableRef = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;

  // Book functionality
  const [passage, setPassage] = useState([]);
  const [book, setBook] = useState("matthew");
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    search(book, chapter);
  }, []);

  const handleSwipeEnd = (direction) => {
    if (direction === "right") {
      search(book, chapter + 1);
    } else {
      search(book, chapter - 1);
    }

    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-250, 0],
      outputRange: [1, 0],
    });

    return (
      <TouchableOpacity
        onPress={this.handleSwipeLeft}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Animated.Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            transform: [{ scale: trans }],
          }}
        >
          <MaterialIcons name="double-arrow" size={24} color="white" />
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-250, 0],
      outputRange: [1, 0],
    });

    return (
      <TouchableOpacity
        onPress={this.handleSwipeLeft}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Animated.Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            transform: [{ scale: trans }],
          }}
        >
          <MaterialIcons name="double-arrow" size={24} color="white" />
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const search = async (book, chapter) => {
    // Handle edge cases
    if (chapter <= 0) {
      // Go to previous book...
      // Set book to previous book, last chapter
      book = bookOrder[book][0];
      chapter = bookCutoffs[bibleBooks[book]];
    } else if (chapter > bookCutoffs[bibleBooks[book]]) {
      // Go to next book...
      // Set book to next book, first chapter
      book = bookOrder[book][1];
      chapter = 1;
    }

    // Set state variables
    setBook(book);
    setChapter(chapter);

    // Fetch data
    const query = await firestore()
      .collection(book)
      .doc(chapter.toString())
      .get();
    const passage_data = query._data;

    // Construct passage array
    var passage_array = [];
    const sorted_passage_data = Object.keys(passage_data).sort();
    var tmp_array = [];
    var final_array = [];
    var key = 0;
    for (const sortedKey of sorted_passage_data) {
      var currentElement = passage_data[sortedKey];
      currentElement.key = key;
      key += 1;

      if (currentElement?.isHeading && currentElement.isHeading === "True") {
        if (tmp_array.length > 0) {
          var regularText = [];
          // Render out the tags
          tmp_array.map((item) => {
            const item_verse_num = item.verseNum;
            const item_verse = item.verse;
            const item_key = item.key;
            var item_tuple = [item_verse_num, item_verse, item_key];
            regularText.push(item_tuple);
          });
          tmp_array = [];
          final_array.push(regularText);
        }
        // Render out heading
        var headerText = [-1, currentElement.verse, currentElement.key];
        final_array.push(headerText);
        continue;
      } else {
        tmp_array.push(currentElement);
      }

      if (
        currentElement.isEndParagraph &&
        currentElement.isEndParagraph === "True"
      ) {
        var regularText = [];
        tmp_array.map((item) => {
          const item_verse_num = item.verseNum;
          const item_verse = item.verse;
          const item_key = item.key;
          var item_tuple = [item_verse_num, item_verse, item_key];
          regularText.push(item_tuple);
        });
        tmp_array = [];
        final_array.push(regularText);
      }
    }
    if (tmp_array.length > 0) {
      var regularText = [];
      tmp_array.map((item) => {
        const item_verse_num = item.verseNum;
        const item_verse = item.verse;
        const item_key = item.key;
        var item_tuple = [item_verse_num, item_verse, item_key];
        regularText.push(item_tuple);
      });
      tmp_array = [];
      final_array.push(regularText);
    }
    setPassage(final_array);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* <Header book={bibleBooks[book]} chapter={chapter} search={search} /> */}
        <Swipeable
          ref={swipeableRef}
          friction={1}
          rightThreshold={200}
          onSwipeableWillOpen={(direction) => {
            if (direction === "right") {
              console.log("right");
              Animated.timing(translateX, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
              }).start();
            } else {
              Animated.timing(translateX, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }
          }}
          onSwipeableOpen={(direction) => {
            handleSwipeEnd(direction);
            swipeableRef.current.close();
          }}
          onSwipeableWillClose={(direction) => {
            if (direction === "right") {
              Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
            } else {
              Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
            }
          }}
          renderRightActions={renderRightActions}
          renderLeftActions={renderLeftActions}
        >
          <View>
            <Passage
              book={book}
              bookFormatted={bibleBooks[book]}
              chapter={chapter}
              passage={passage}
            />
          </View>
        </Swipeable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: "white",
  },
  leftAction: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  rightAction: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    paddingLeft: 20,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;
