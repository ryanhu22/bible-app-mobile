import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import RegularText from "./CustomTexts/RegularText";
import VerseText from "./CustomTexts/VerseText";
import HeaderText from "./CustomTexts/HeaderText";
import TextNoNewline from "./CustomTexts/TextNoNewline";
import SwipeableFooter from "./CustomFooters/SwipeableFooter";
import TypeCommentFooter from "./CustomFooters/FooterContent/TypeCommentFooter";
import ShowCommentFooter from "./CustomFooters/FooterContent/ShowCommentFooter";
import SelectionFooter from "./CustomFooters/FooterContent/SelectionFooter";
import { explain } from "../api/openai_api";
import React, { useRef, useState, useEffect } from "react";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";

const Passage = ({ passage }) => {
  // Layout Functionalities
  const screenHeight = Dimensions.get("window").height;
  const scrollViewHeightFull = screenHeight * 0.85; // Adjust the percentage as desired
  const scrollViewRef = useRef(null);
  const [textLayout, setTextLayout] = useState(null);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Highlighting Functionalities
  const [underlineIds, setUnderlineIds] = useState([]);
  const [yellowHighlightIds, setHighlightYellowHighlightIds] = useState(
    new Set()
  );

  // Commenting Functionalities
  const [comments, setComments] = useState({});
  const [currVerseComment, setCurrVerseComment] = useState(null);
  const [showCommentFooter, setShowCommentFooter] = useState(false);
  const [showCommentFooterInput, setShowCommentFooterInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // On new page, reset everything
  useEffect(() => {
    setUnderlineIds([]);
    setHighlightYellowHighlightIds(new Set());
    setComments({});
    setCurrVerseComment(null);
    setShowCommentFooter(false);
    setShowCommentFooterInput(false);
    setCommentInput("");
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

    if (scrollViewRef.current && event?.nativeEvent) {
      // Handle footer
      if (numInUnderlineIds(verse)) {
        removeFromUnderlineIds(verse);
      } else {
        appendToUnderlineIds(verse);
      }
      //   const pageY = event.nativeEvent.pageY - 100;

      //   // Handle scroll
      //   //   console.log("ScrollViewHeight: ", scrollViewHeight);
      //   //   console.log("PageY: " + pageY);
      //   const scrollOffset = scrollViewHeight - pageY;
      //   //   No need to scroll
      //   if (scrollOffset > 100) {
      //     return;
      //   } else if (scrollOffset < 0) {
      //     return;
      //   }
      //   const scrollUp = 400 - scrollOffset; // 200 is how big of a footer you want to display.
      //   //   console.log("ScrollOffset", scrollOffset);
      //   //   console.log("ScrollUp", scrollUp);
      //   //   console.log(scrollViewRef.current);
      //   const currentOffset = scrollViewRef.current.getContentOffset?.().y || 0;
      //   //   console.log("CurrentOffset", currentOffset);
      //   //   console.log("???", event.nativeEvent.contentOffset.y);
      //   //   console.log(currentOffset - scrollUp);
      //   scrollViewRef.current.scrollTo({
      //     y: currentOffset + scrollUp,
      //     animated: true,
      //   });
    }
    return;
  };

  const sendComment = () => {
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

  const highlightYellow = () => {
    underlineIds.forEach((verse) => {
      yellowHighlightIds.add(verse);
    });
    setHighlightYellowHighlightIds(new Set(yellowHighlightIds));
    setUnderlineIds([]);
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

  const handleTextLayout = (event) => {
    const { layout } = event.nativeEvent;
    setTextLayout(layout);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity onPress={() => explain("Hello")}>
        <Text style={{ color: "white" }}>Test me!</Text>
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setScrollViewHeight(height);
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
          >
            <TypeCommentFooter
              hideCommentInput={hideCommentInput}
              sendComment={sendComment}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
            />
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
            setCurrVerseComment={setCurrVerseComment}
          >
            <SelectionFooter
              highlightYellow={highlightYellow}
              showCommentInput={showCommentInput}
            />
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
          setCurrVerseComment={setCurrVerseComment}
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
