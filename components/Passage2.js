import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import RegularText from "./CustomTexts/RegularText";
import VerseText from "./CustomTexts/VerseText";
import HeaderText from "./CustomTexts/HeaderText";
import TextNoNewline from "./CustomTexts/TextNoNewline";
import SwipeableFooter from "./SwipeableFooter";
import React, { useRef, useState, useEffect } from "react";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import HTML from "react-native-render-html";
import HTMLParser from "react-native-html-parser";

const Passage = ({ html_str }) => {
  var DomParser = require("react-native-html-parser").DOMParser;

  // Layout Functionalities
  const scrollViewRef = useRef(null);
  const [textLayout, setTextLayout] = useState(null);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Highlighting Functionalities
  const [underlineIds, setUnderlineIds] = useState(new Set());
  const [yellowHighlightIds, setHighlightYellowHighlightIds] = useState(
    new Set()
  );

  // Commenting Functionalities
  const [comments, setComments] = useState({});
  const [currVerseComment, setCurrVerseComment] = useState(null);
  const [showCommentFooter, setShowCommentFooter] = useState(false);
  const [showCommentFooterInput, setShowCommentFooterInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // Handle automatic closing of footer when no underlines
  useEffect(() => {
    if (underlineIds.size === 0) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [underlineIds]);

  const handleTextPress = (event, verse) => {
    if (isReset) {
      setIsReset(false);
    }

    // If clicking on a comment...
    if (verse in comments) {
      setUnderlineIds(new Set());
      setCurrVerseComment(verse);
      setShowCommentFooter(true);
      setShowFooter(true);
      setIsReset(true);
      return;
    }

    setCurrVerseComment(null);
    setShowCommentFooter(false);
    setShowFooter(true);
    hideCommentInput();

    if (scrollViewRef.current && event?.nativeEvent) {
      // Handle footer
      if (underlineIds.has(verse)) {
        removeFromUnderlineIds(verse);
      } else {
        appendToUnderlineIds(verse);
      }
      const pageY = event.nativeEvent.pageY - 100;

      // Handle scroll
      //   console.log("ScrollViewHeight: ", scrollViewHeight);
      //   console.log("PageY: " + pageY);
      const scrollOffset = scrollViewHeight - pageY;
      //   No need to scroll
      if (scrollOffset > 100) {
        return;
      } else if (scrollOffset < 0) {
        return;
      }
      const scrollUp = 400 - scrollOffset; // 200 is how big of a footer you want to display.
      //   console.log("ScrollOffset", scrollOffset);
      //   console.log("ScrollUp", scrollUp);
      //   console.log(scrollViewRef.current);
      const currentOffset = scrollViewRef.current.getContentOffset?.().y || 0;
      //   console.log("CurrentOffset", currentOffset);
      //   console.log("???", event.nativeEvent.contentOffset.y);
      //   console.log(currentOffset - scrollUp);
      scrollViewRef.current.scrollTo({
        y: currentOffset + scrollUp,
        animated: "True",
      });
    }
  };

  const sendComment = () => {
    if (commentInput === "") {
      return;
    }
    const updatedComments = { ...comments };
    for (const verse of underlineIds) {
      updatedComments[verse] = commentInput;
    }
    setUnderlineIds(new Set());
    setComments(updatedComments);
    setCommentInput("");
    hideCommentInput();
  };

  const highlightYellow = () => {
    underlineIds.forEach((verse) => {
      yellowHighlightIds.add(verse);
    });
    setHighlightYellowHighlightIds(new Set(yellowHighlightIds));
    setUnderlineIds(new Set());
  };

  // Helper Functions
  const appendToUnderlineIds = (int) => {
    setUnderlineIds(new Set([...underlineIds, int]));
  };

  const removeFromUnderlineIds = (int) => {
    const updatedSet = new Set(underlineIds);
    updatedSet.delete(int);
    setUnderlineIds(updatedSet);
  };

  const showCommentInput = () => {
    setShowCommentFooterInput(true);
  };

  const hideCommentInput = () => {
    setShowCommentFooterInput(false);
  };

  const handleTextLayout = (event) => {
    const { layout } = event.nativeEvent;
    setTextLayout(layout);
  };

  const passage_json = {
    0: {
      isEndParagraph: "True",
      verse:
        " “Beware of practicing your righteousness before other people in order to be seen by them, for then you will have no reward from your Father who is in heaven.",
      isHeading: "False",
      verseNum: 1,
    },
    1: {
      isEndParagraph: "False",
      verse:
        " “Thus, when you give to the needy, sound no trumpet before you, as the hypocrites do in the synagogues and in the streets, that they may be praised by others. Truly, I say to you, they have received their reward.",
      isHeading: "False",
      verseNum: 2,
    },
    2: {
      isEndParagraph: "False",
      verse:
        " But when you give to the needy, do not let your left hand know what your right hand is doing,",
      isHeading: "False",
      verseNum: 3,
    },
    3: {
      isEndParagraph: "False",
      verse:
        " so that your giving may be in secret. And your Father who sees in secret will reward you.",
      isHeading: "False",
      verseNum: 4,
    },
    4: { isHeading: "True", verse: "The Lord’s Prayer" },
    5: {
      isEndParagraph: "False",
      verse:
        " “And when you pray, you must not be like the hypocrites. For they love to stand and pray in the synagogues and at the street corners, that they may be seen by others. Truly, I say to you, they have received their reward.",
      isHeading: "False",
      verseNum: 5,
    },
    6: {
      isEndParagraph: "True",
      verse:
        " But when you pray, go into your room and shut the door and pray to your Father who is in secret. And your Father who sees in secret will reward you.",
      isHeading: "False",
      verseNum: 6,
    },
    7: {
      isEndParagraph: "False",
      verse:
        " “And when you pray, do not heap up empty phrases as the Gentiles do, for they think that they will be heard for their many words.",
      isHeading: "False",
      verseNum: 7,
    },
    8: {
      isEndParagraph: "False",
      verse:
        " Do not be like them, for your Father knows what you need before you ask him.",
      isHeading: "False",
      verseNum: 8,
    },
    9: {
      isEndParagraph: "False",
      verse:
        " Pray then like this:\n\n    “Our Father in heaven,\n    hallowed be your name.\n",
      isHeading: "False",
      verseNum: 9,
    },
    10: {
      isEndParagraph: "False",
      verse:
        " Your kingdom come,\n    your will be done,\n        on earth as it is in heaven.\n",
      isHeading: "False",
      verseNum: 10,
    },
    11: {
      isEndParagraph: "False",
      verse: " Give us this day our daily bread,\n",
      isHeading: "False",
      verseNum: 11,
    },
    12: {
      isEndParagraph: "False",
      verse:
        " and forgive us our debts,\n        as we also have forgiven our debtors.\n",
      isHeading: "False",
      verseNum: 12,
    },
    13: {
      isEndParagraph: "False",
      verse:
        " And lead us not into temptation,\n        but deliver us from evil.\n    \n    \n",
      isHeading: "False",
      verseNum: 13,
    },
    14: {
      isEndParagraph: "False",
      verse:
        " For if you forgive others their trespasses, your heavenly Father will also forgive you,",
      isHeading: "False",
      verseNum: 14,
    },
    15: {
      isEndParagraph: "False",
      verse:
        " but if you do not forgive others their trespasses, neither will your Father forgive your trespasses.",
      isHeading: "False",
      verseNum: 15,
    },
    16: { isHeading: "True", verse: "Fasting" },
    17: {
      isEndParagraph: "False",
      verse:
        " “And when you fast, do not look gloomy like the hypocrites, for they disfigure their faces that their fasting may be seen by others. Truly, I say to you, they have received their reward.",
      isHeading: "False",
      verseNum: 16,
    },
    18: {
      isEndParagraph: "False",
      verse: " But when you fast, anoint your head and wash your face,",
      isHeading: "False",
      verseNum: 17,
    },
    19: {
      isEndParagraph: "False",
      verse:
        " that your fasting may not be seen by others but by your Father who is in secret. And your Father who sees in secret will reward you.",
      isHeading: "False",
      verseNum: 18,
    },
    20: { isHeading: "True", verse: "Lay Up Treasures in Heaven" },
    21: {
      isEndParagraph: "False",
      verse:
        " “Do not lay up for yourselves treasures on earth, where moth and rust destroy and where thieves break in and steal,",
      isHeading: "False",
      verseNum: 19,
    },
    22: {
      isEndParagraph: "False",
      verse:
        " but lay up for yourselves treasures in heaven, where neither moth nor rust destroys and where thieves do not break in and steal.",
      isHeading: "False",
      verseNum: 20,
    },
    23: {
      isEndParagraph: "True",
      verse: " For where your treasure is, there your heart will be also.",
      isHeading: "False",
      verseNum: 21,
    },
    24: {
      isEndParagraph: "False",
      verse:
        " “The eye is the lamp of the body. So, if your eye is healthy, your whole body will be full of light,",
      isHeading: "False",
      verseNum: 22,
    },
    25: {
      isEndParagraph: "True",
      verse:
        " but if your eye is bad, your whole body will be full of darkness. If then the light in you is darkness, how great is the darkness!",
      isHeading: "False",
      verseNum: 23,
    },
    26: {
      isEndParagraph: "False",
      verse:
        " “No one can serve two masters, for either he will hate the one and love the other, or he will be devoted to the one and despise the other. You cannot serve God and money.",
      isHeading: "False",
      verseNum: 24,
    },
    27: { isHeading: "True", verse: "Do Not Be Anxious" },
    28: {
      isEndParagraph: "False",
      verse:
        " “Therefore I tell you, do not be anxious about your life, what you will eat or what you will drink, nor about your body, what you will put on. Is not life more than food, and the body more than clothing?",
      isHeading: "False",
      verseNum: 25,
    },
    29: {
      isEndParagraph: "False",
      verse:
        " Look at the birds of the air: they neither sow nor reap nor gather into barns, and yet your heavenly Father feeds them. Are you not of more value than they?",
      isHeading: "False",
      verseNum: 26,
    },
    30: {
      isEndParagraph: "False",
      verse:
        " And which of you by being anxious can add a single hour to his span of life?",
      isHeading: "False",
      verseNum: 27,
    },
    31: {
      isEndParagraph: "False",
      verse:
        " And why are you anxious about clothing? Consider the lilies of the field, how they grow: they neither toil nor spin,",
      isHeading: "False",
      verseNum: 28,
    },
    32: {
      isEndParagraph: "False",
      verse:
        " yet I tell you, even Solomon in all his glory was not arrayed like one of these.",
      isHeading: "False",
      verseNum: 29,
    },
    33: {
      isEndParagraph: "False",
      verse:
        " But if God so clothes the grass of the field, which today is alive and tomorrow is thrown into the oven, will he not much more clothe you, O you of little faith?",
      isHeading: "False",
      verseNum: 30,
    },
    34: {
      isEndParagraph: "False",
      verse:
        " Therefore do not be anxious, saying, ‘What shall we eat?’ or ‘What shall we drink?’ or ‘What shall we wear?’",
      isHeading: "False",
      verseNum: 31,
    },
    35: {
      isEndParagraph: "False",
      verse:
        " For the Gentiles seek after all these things, and your heavenly Father knows that you need them all.",
      isHeading: "False",
      verseNum: 32,
    },
    36: {
      isEndParagraph: "True",
      verse:
        " But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
      isHeading: "False",
      verseNum: 33,
    },
    37: {
      isEndParagraph: "False",
      verse:
        " “Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble.",
      isHeading: "False",
      verseNum: 34,
    },
  };

  var renderTags = [];
  var tmpArray = [];
  for (let i = 0; i < Object.keys(passage_json).length; i++) {
    var currElement = passage_json[i];
    // If it's a header
    if (currElement.isHeading === "True") {
      const renderTagOld = (
        <RegularText>
          {tmpArray.map((item) => {
            return (
              <TextNoNewline
                verse={item.verseNum}
                reset={isReset}
                onPress={(e) => handleTextPress(e, item.verseNum)}
                onLayout={handleTextLayout}
                yellowHighlightIds={yellowHighlightIds}
                comments={comments}
                selectedComment={currVerseComment}
              >
                <VerseText class="verse-num" id="v01001011-1">
                  {" " + item.verseNum}
                </VerseText>
                {item.verse}
              </TextNoNewline>
            );
          })}
        </RegularText>
      );

      const renderTagHeader = <HeaderText>{currElement.verse}</HeaderText>;

      tmpArray = [];
      renderTags.push(renderTagOld);
      renderTags.push(renderTagHeader);
    } else {
      tmpArray.push(currElement);
    }

    if (currElement.isEndParagraph && currElement.isEndParagraph === "True") {
      // Construct
      const renderTag = (
        <RegularText>
          {tmpArray.map((item) => {
            return (
              <TextNoNewline
                verse={item.verseNum}
                reset={isReset}
                onPress={(e) => handleTextPress(e, item.verseNum)}
                onLayout={handleTextLayout}
                yellowHighlightIds={yellowHighlightIds}
                comments={comments}
                selectedComment={currVerseComment}
              >
                <VerseText class="verse-num" id="v01001011-1">
                  {" " + item.verseNum}
                </VerseText>
                {item.verse}
              </TextNoNewline>
            );
          })}
        </RegularText>
      );

      tmpArray = [];
      renderTags.push(renderTag);
      console.log(renderTags);
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <ScrollView
        ref={scrollViewRef}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setScrollViewHeight(height);
        }}
        style={{ paddingHorizontal: 15, flex: 0.7 }}
      >
        {renderTags}
      </ScrollView>

      {showFooter && !showCommentFooter ? (
        showCommentFooterInput ? (
          <SwipeableFooter
            style={{ flex: 0.5 }}
            height={450}
            setShowFooter={setShowFooter}
            setShowCommentFooter={setShowCommentFooter}
            setIsReset={setIsReset}
            setUnderlineIds={setUnderlineIds}
            hideCommentInput={hideCommentInput}
          >
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
          </SwipeableFooter>
        ) : (
          <SwipeableFooter
            style={{ flex: 0.3 }}
            height={130}
            setShowFooter={setShowFooter}
            setShowCommentFooter={setShowCommentFooter}
            setIsReset={setIsReset}
            setUnderlineIds={setUnderlineIds}
            hideCommentInput={hideCommentInput}
          >
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
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
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
          </SwipeableFooter>
        )
      ) : null}

      {showCommentFooter ? (
        // Comment Footer
        <SwipeableFooter
          style={{ flex: 0.3 }}
          height={130}
          setShowFooter={setShowFooter}
          setShowCommentFooter={setShowCommentFooter}
          setIsReset={setIsReset}
          setUnderlineIds={setUnderlineIds}
          hideCommentInput={hideCommentInput}
        >
          <View style={styles.footer}>
            <Text
              style={{
                color: "white",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Verse {currVerseComment}
            </Text>
            <Text style={{ color: "white", marginTop: 5 }}>
              {comments[currVerseComment]}
            </Text>
          </View>
        </SwipeableFooter>
      ) : null}
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

export default Passage;
