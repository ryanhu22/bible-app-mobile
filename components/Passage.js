import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
// Texts
import RegularText from "./CustomTexts/RegularText";
import VerseText from "./CustomTexts/VerseText";
import HeaderText from "./CustomTexts/HeaderText";
import TextNoNewline from "./CustomTexts/TextNoNewline";
// Footers
import SwipeableFooter from "./CustomFooters/SwipeableFooter";
import TypeCommentFooter from "./CustomFooters/FooterContent/TypeCommentFooter";
import ShowCommentFooter from "./CustomFooters/FooterContent/ShowCommentFooter";
import SelectionFooter from "./CustomFooters/FooterContent/SelectionFooter";
import ExplainFooter from "./CustomFooters/FooterContent/ExplainFooter";
import AskAIFooter from "./CustomFooters/FooterContent/AskAIFooter";
import SummarizeFooter from "./CustomFooters/FooterContent/SummarizeFooter";

import { explainAPI } from "../api/openai_api";
import React, { useRef, useState, useEffect } from "react";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";

import db from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Passage = ({ book, bookFormatted, chapter, passage }) => {
  // Layout Functionalities
  const [scrollHeight, setScrollHeight] = useState(0);
  const screenHeight = Dimensions.get("window").height;
  const scrollViewHeightFull = screenHeight * 0.85; // Adjust the percentage as desired
  const scrollViewRef = useRef(null);
  const [textLayout, setTextLayout] = useState(null);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Highlighting Functionalities
  const [userInfo, setUserInfo] = useState(null);
  const [underlineIds, setUnderlineIds] = useState([]);
  const [yellowHighlightIds, setYellowHighlightIds] = useState(new Set());
  const [blueHighlightIds, setBlueHighlightIds] = useState(new Set());
  const [pinkHighlightIds, setPinkHighlightIds] = useState(new Set());
  const [greenHighlightIds, setGreenHighlightIds] = useState(new Set());
  const [purpleHighlightIds, setPurpleHighlightIds] = useState(new Set());
  const [orangeHighlightIds, setOrangeHighlightIds] = useState(new Set());
  const [redHighlightIds, setRedHighlightIds] = useState(new Set());

  // Commenting Functionalities
  const [comments, setComments] = useState({});
  const [currVerseComment, setCurrVerseComment] = useState(null);
  const [showCommentFooter, setShowCommentFooter] = useState(false);
  const [showCommentFooterInput, setShowCommentFooterInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // AI Functionalities
  const [showExplainFooter, setShowExplainFooter] = useState(false);
  const [showAIFooter, setShowAIFooter] = useState(false);
  const [showSummarizeFooter, setShowSummarizeFooter] = useState(false);

  // On new page, reset everything
  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    setUnderlineIds([]);
    setYellowHighlightIds(new Set());
    setBlueHighlightIds(new Set());
    setPinkHighlightIds(new Set());
    setGreenHighlightIds(new Set());
    setPurpleHighlightIds(new Set());
    setOrangeHighlightIds(new Set());
    setRedHighlightIds(new Set());
    setComments({});
    setCurrVerseComment(null);
    setShowCommentFooter(false);
    setShowCommentFooterInput(false);
    setCommentInput("");

    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        setUserInfo(JSON.parse(user));
      }
    };
    checkUser();
  }, [passage]);

  // Handle automatic closing of footer when no underlines
  useEffect(() => {
    if (underlineIds.length === 0) {
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
      setUnderlineIds([]);
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
    hideExplain();

    if (scrollViewRef.current && event?.nativeEvent) {
      // Handle footer
      if (numInUnderlineIds(verse)) {
        removeFromUnderlineIds(verse);
      } else {
        appendToUnderlineIds(verse);
      }
      const pageY = event.nativeEvent.pageY - 100;

      // Handle scroll
      const scrollOffset = scrollViewHeight - pageY;
      //   No need to scroll
      if (scrollOffset > 250) {
        return;
      }
      const scrollUp = 250 - scrollOffset; // 250 is how big of a footer you want to display.
      const currentOffset = scrollHeight;
      scrollViewRef.current.scrollTo({
        y: currentOffset + scrollUp,
        animated: true,
      });
    }
    return;
  };

  const handleScroll = (e) => {
    setScrollHeight(e.nativeEvent.contentOffset.y);
  };

  const sendComment = () => {
    removeHighlight();
    if (commentInput === "") {
      return;
    }
    const updatedComments = { ...comments };
    for (const verse of underlineIds) {
      updatedComments[verse] = commentInput;
    }
    setUnderlineIds([]);
    setComments(updatedComments);
    setCommentInput("");
    hideCommentInput();
  };

  const sendCustomComment = (customComment) => {
    const updatedComments = { ...comments };
    for (const verse of underlineIds) {
      updatedComments[verse] = customComment;
    }
    setUnderlineIds([]);
    setComments(updatedComments);
    setCommentInput("");
    hideCommentInput();
  };

  const removeHighlight = () => {
    underlineIds.forEach((verse) => {
      yellowHighlightIds.delete(verse);
      blueHighlightIds.delete(verse);
      pinkHighlightIds.delete(verse);
      greenHighlightIds.delete(verse);
      purpleHighlightIds.delete(verse);
      orangeHighlightIds.delete(verse);
      redHighlightIds.delete(verse);
    });
    setYellowHighlightIds(new Set(yellowHighlightIds));
    setBlueHighlightIds(new Set(blueHighlightIds));
    setPinkHighlightIds(new Set(pinkHighlightIds));
    setGreenHighlightIds(new Set(greenHighlightIds));
    setPurpleHighlightIds(new Set(purpleHighlightIds));
    setOrangeHighlightIds(new Set(orangeHighlightIds));
    setRedHighlightIds(new Set(redHighlightIds));
    setUnderlineIds([]);
  };

  const saveHighlights = async () => {
    await saveYellowHighlights();
    await saveBlueHighlights();
    await savePinkHighlights();
    await saveGreenHighlights();
    await savePurpleHighlights();
    await saveOrangeHighlights();
    await saveRedHighlights();
  };

  const saveYellowHighlights = async () => {
    await db()
      .ref(`/users/${userInfo.uid}/highlights/${book}/yellow/`)
      .set({ Verses: Array.from(yellowHighlightIds) });
  };

  const saveBlueHighlights = async () => {
    await db()
      .ref(`/users/${userInfo.uid}/highlights/${book}/blue/`)
      .set({ Verses: Array.from(blueHighlightIds) });
  };

  const savePinkHighlights = async () => {
    await db()
      .ref(`/users/${userInfo.uid}/highlights/${book}/pink/`)
      .set({ Verses: Array.from(pinkHighlightIds) });
  };

  const saveGreenHighlights = async () => {
    await db()
      .ref(`/users/${userInfo.uid}/highlights/${book}/green/`)
      .set({ Verses: Array.from(greenHighlightIds) });
  };

  const savePurpleHighlights = async () => {
    await db()
      .ref(`/users/${userInfo.uid}/highlights/${book}/purple/`)
      .set({ Verses: Array.from(purpleHighlightIds) });
  };

  const saveOrangeHighlights = async () => {
    await db()
      .ref(`/users/${userInfo.uid}/highlights/${book}/orange/`)
      .set({ Verses: Array.from(orangeHighlightIds) });
  };

  const saveRedHighlights = async () => {
    await db()
      .ref(`/users/${userInfo.uid}/highlights/${book}/red`)
      .set({ Verses: Array.from(redHighlightIds) });
  };

  const highlightYellow = () => {
    removeHighlight();
    underlineIds.forEach((verse) => {
      yellowHighlightIds.add(verse);
    });
    setYellowHighlightIds(new Set(yellowHighlightIds));
    setUnderlineIds([]);
    saveHighlights();
  };

  const highlightBlue = () => {
    removeHighlight();
    underlineIds.forEach((verse) => {
      blueHighlightIds.add(verse);
    });
    setBlueHighlightIds(new Set(blueHighlightIds));
    setUnderlineIds([]);
    saveHighlights();
  };

  const highlightPink = () => {
    removeHighlight();
    underlineIds.forEach((verse) => {
      pinkHighlightIds.add(verse);
    });
    setPinkHighlightIds(new Set(pinkHighlightIds));
    setUnderlineIds([]);
    saveHighlights();
  };

  const highlightGreen = () => {
    removeHighlight();
    underlineIds.forEach((verse) => {
      greenHighlightIds.add(verse);
    });
    setGreenHighlightIds(new Set(greenHighlightIds));
    setUnderlineIds([]);
    saveHighlights();
  };

  const highlightPurple = () => {
    removeHighlight();
    underlineIds.forEach((verse) => {
      purpleHighlightIds.add(verse);
    });
    setPurpleHighlightIds(new Set(purpleHighlightIds));
    setUnderlineIds([]);
    saveHighlights();
  };

  const highlightOrange = () => {
    removeHighlight();
    underlineIds.forEach((verse) => {
      orangeHighlightIds.add(verse);
    });
    setOrangeHighlightIds(new Set(orangeHighlightIds));
    setUnderlineIds([]);
    saveHighlights();
  };

  const highlightRed = () => {
    removeHighlight();
    underlineIds.forEach((verse) => {
      redHighlightIds.add(verse);
    });
    setRedHighlightIds(new Set(redHighlightIds));
    setUnderlineIds([]);
    saveHighlights();
  };

  // Helper Functions
  const numInUnderlineIds = (number) => {
    return underlineIds.includes(number);
  };

  const appendToUnderlineIds = (number) => {
    setUnderlineIds((prevUnderlineIds) => [...prevUnderlineIds, number]);
  };

  const removeFromUnderlineIds = (number) => {
    setUnderlineIds((prevUnderlineIds) =>
      prevUnderlineIds.filter((id) => id !== number)
    );
  };

  const showCommentInput = () => {
    setShowCommentFooterInput(true);
  };

  const hideCommentInput = () => {
    setShowCommentFooterInput(false);
  };

  const showExplain = () => {
    setShowExplainFooter(true);
  };

  const hideExplain = () => {
    setShowExplainFooter(false);
  };

  const showAI = () => {
    setShowAIFooter(true);
  };

  const hideAI = () => {
    setShowAIFooter(false);
  };

  const showSummarize = () => {
    setShowFooter(true);
    setShowSummarizeFooter(true);
  };

  const hideSummarize = () => {
    setShowFooter(false);
    setShowSummarizeFooter(false);
  };

  const handleTextLayout = (event) => {
    const { layout } = event.nativeEvent;
    setTextLayout(layout);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity onPress={saveHighlights}>
        <Text style={{ color: "white" }}>PRESS ME</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setScrollViewHeight(height);
        }}
        onScroll={(e) => {
          handleScroll(e);
        }}
        style={{ paddingHorizontal: 15, height: scrollViewHeightFull }}
      >
        {/* RENDER PASSAGE HERE */}
        {passage.map((text, index) => {
          if (text[0] === -1) {
            return <HeaderText key={text[2]}>{text[1]}</HeaderText>;
          }
          return (
            <RegularText key={2000 + index}>
              {text.map((textNoNewline) => {
                return (
                  <TextNoNewline
                    verse={textNoNewline[0]}
                    reset={isReset}
                    onPress={(e) => handleTextPress(e, textNoNewline[0])}
                    onLayout={handleTextLayout}
                    yellowHighlightIds={yellowHighlightIds}
                    blueHighlightIds={blueHighlightIds}
                    pinkHighlightIds={pinkHighlightIds}
                    greenHighlightIds={greenHighlightIds}
                    purpleHighlightIds={purpleHighlightIds}
                    orangeHighlightIds={orangeHighlightIds}
                    redHighlightIds={redHighlightIds}
                    comments={comments}
                    selectedComment={currVerseComment}
                    underlineIds={underlineIds}
                    key={textNoNewline[2]}
                  >
                    <VerseText key={1000 + textNoNewline[2]}>
                      {" " + textNoNewline[0]}
                    </VerseText>
                    {textNoNewline[1]}
                  </TextNoNewline>
                );
              })}
            </RegularText>
          );
        })}
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={showSummarize}>
            <View
              style={{
                backgroundColor: "transparent",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "white",
                padding: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="color-wand"
                size={24}
                color="white"
                style={{ paddingBottom: 5 }}
              />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                }}
              >
                Summarize Chapter
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, height: 100 }}></View>
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
            setCurrVerseComment={setCurrVerseComment}
            hideExplain={hideExplain}
            hideSummarize={hideSummarize}
            hideAI={hideAI}
          >
            <TypeCommentFooter
              underlineIds={underlineIds}
              hideCommentInput={hideCommentInput}
              sendComment={sendComment}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
            />
          </SwipeableFooter>
        ) : showExplainFooter ? (
          <SwipeableFooter
            style={{ flex: 0.5 }}
            height={450}
            setShowFooter={setShowFooter}
            setShowCommentFooter={setShowCommentFooter}
            setIsReset={setIsReset}
            setUnderlineIds={setUnderlineIds}
            hideCommentInput={hideCommentInput}
            setCurrVerseComment={setCurrVerseComment}
            hideExplain={hideExplain}
            hideSummarize={hideSummarize}
            hideAI={hideAI}
          >
            <ExplainFooter
              book={bookFormatted}
              chapter={chapter}
              underlineIds={underlineIds}
              hideCommentInput={hideCommentInput}
              sendCustomComment={sendCustomComment}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              hideExplain={hideExplain}
            />
          </SwipeableFooter>
        ) : showAIFooter ? (
          <SwipeableFooter
            style={{ flex: 0.5 }}
            height={450}
            setShowFooter={setShowFooter}
            setShowCommentFooter={setShowCommentFooter}
            setIsReset={setIsReset}
            setUnderlineIds={setUnderlineIds}
            hideCommentInput={hideCommentInput}
            setCurrVerseComment={setCurrVerseComment}
            hideExplain={hideExplain}
            hideSummarize={hideSummarize}
            hideAI={hideAI}
          >
            <AskAIFooter
              book={bookFormatted}
              chapter={chapter}
              underlineIds={underlineIds}
              hideCommentInput={hideCommentInput}
              sendCustomComment={sendCustomComment}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              hideAI={hideAI}
            />
          </SwipeableFooter>
        ) : showSummarizeFooter ? (
          <SwipeableFooter
            style={{ flex: 0.5 }}
            height={450}
            setShowFooter={setShowFooter}
            setShowCommentFooter={setShowCommentFooter}
            setIsReset={setIsReset}
            setUnderlineIds={setUnderlineIds}
            hideCommentInput={hideCommentInput}
            setCurrVerseComment={setCurrVerseComment}
            hideExplain={hideExplain}
            hideSummarize={hideSummarize}
            hideAI={hideAI}
          >
            <SummarizeFooter
              book={bookFormatted}
              chapter={chapter}
              underlineIds={underlineIds}
              hideCommentInput={hideCommentInput}
              sendCustomComment={sendCustomComment}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              hideSummarize={hideSummarize}
            />
          </SwipeableFooter>
        ) : (
          <SwipeableFooter
            style={{ flex: 0.3 }}
            height={250}
            setShowFooter={setShowFooter}
            setShowCommentFooter={setShowCommentFooter}
            setIsReset={setIsReset}
            setUnderlineIds={setUnderlineIds}
            hideCommentInput={hideCommentInput}
            setCurrVerseComment={setCurrVerseComment}
            hideExplain={hideExplain}
            hideSummarize={hideSummarize}
            hideAI={hideAI}
          >
            <SelectionFooter
              underlineIds={underlineIds}
              showExplain={showExplain}
              showAI={showAI}
              highlightYellow={highlightYellow}
              highlightBlue={highlightBlue}
              highlightPink={highlightPink}
              highlightGreen={highlightGreen}
              highlightPurple={highlightPurple}
              highlightOrange={highlightOrange}
              highlightRed={highlightRed}
              removeHighlight={removeHighlight}
              showCommentInput={showCommentInput}
            />
          </SwipeableFooter>
        )
      ) : null}

      {showCommentFooter ? (
        // Comment Footer
        <SwipeableFooter
          style={{ flex: 0.3 }}
          height={250}
          setShowFooter={setShowFooter}
          setShowCommentFooter={setShowCommentFooter}
          setIsReset={setIsReset}
          setUnderlineIds={setUnderlineIds}
          hideCommentInput={hideCommentInput}
          setCurrVerseComment={setCurrVerseComment}
          hideExplain={hideExplain}
          hideSummarize={hideSummarize}
          hideAI={hideAI}
        >
          <ShowCommentFooter
            currVerseComment={currVerseComment}
            comments={comments}
          />
        </SwipeableFooter>
      ) : null}
    </View>
  );
};

export default Passage;
