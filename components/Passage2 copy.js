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

import firestore from "@react-native-firebase/firestore";

const Passage = ({ passage }) => {
  // Layout Functionalities
  const scrollViewRef = useRef(null);
  const [textLayout, setTextLayout] = useState(null);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Highlighting Functionalities
  const [underlineIds, setUnderlineIds] = useState([]);
  const [underlineIds2, setUnderlineIds2] = useState([]);
  const [yellowHighlightIds, setHighlightYellowHighlightIds] = useState(
    new Set()
  );

  // Commenting Functionalities
  const [comments, setComments] = useState({});
  const [currVerseComment, setCurrVerseComment] = useState(null);
  const [showCommentFooter, setShowCommentFooter] = useState(false);
  const [showCommentFooterInput, setShowCommentFooterInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // Rendering page
  const [renderTags, setRenderTags] = useState([]);

  console.log(underlineIds2);

  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    console.log("Component rendered"); // Log a message when the component is rendered
    setRenderCount((prevCount) => prevCount + 1);
    console.log(renderCount);
  }, []);

  const appendToRenderTags = async (newTag) => {
    setRenderTags((prevState) => {
      return [...prevState, newTag];
    });
  };

  const setPassage = () => {
    return setRenderTags(
      <TextNoNewline
        verse={1}
        reset={isReset}
        onPress={(e) => handleTextPress(e, 90)}
        // onLayout={handleTextLayout}
        yellowHighlightIds={yellowHighlightIds}
        comments={comments}
        selectedComment={currVerseComment}
        key={50}
      >
        <VerseText>{" " + 1}</VerseText>
        I'M A RENDER TAG
      </TextNoNewline>
    );
  };

  const test1 = (
    <TextNoNewline
      verse={1}
      reset={isReset}
      onPress={(e) => handleTextPress(e, 10)}
      // onLayout={handleTextLayout}
      yellowHighlightIds={yellowHighlightIds}
      comments={comments}
      selectedComment={currVerseComment}
      key={1}
    >
      <VerseText>{" " + 1}</VerseText>
      TEST1
    </TextNoNewline>
  );

  // Handle passage loading
  const setPassag2 = () => {
    setRenderTags([]);
    var tmpArray = [];
    if (!passage) {
      return;
    }
    const sortedKeys = Object.keys(passage).sort();
    var key = 0;
    for (const sortedKey of sortedKeys) {
      var currElement = passage[sortedKey];
      console.log("IN THIS FUNC");
      console.log(currElement);
      // If it's a header
      if (currElement?.isHeading && currElement.isHeading === "True") {
        if (tmpArray.length > 0) {
          const renderTagOld = (
            <RegularText key={key}>
              {tmpArray.map((item) => {
                const currVerseNum = item.verseNum;
                key += 2;
                return (
                  <TextNoNewline
                    verse={currVerseNum}
                    reset={isReset}
                    onPress={(e) => handleTextPress(e, currVerseNum)}
                    onLayout={handleTextLayout}
                    yellowHighlightIds={yellowHighlightIds}
                    comments={comments}
                    selectedComment={currVerseComment}
                    key={key + 1}
                  >
                    <VerseText key={key}>{" " + item.verseNum}</VerseText>
                    {item.verse}
                  </TextNoNewline>
                );
              })}
            </RegularText>
          );
          key += 3;
          tmpArray = [];
          setTimeout(() => {
            appendToRenderTags(renderTagOld);
          }, 1000);
          // renderTags.push(renderTagOld);
        }

        const renderTagHeader = (
          <HeaderText key={key + 1}>{currElement.verse}</HeaderText>
        );
        key += 2;
        setTimeout(() => {
          appendToRenderTags(renderTagHeader);
        }, 1000);

        continue;

        // renderTags.push(renderTagHeader);
      } else {
        tmpArray.push(currElement);
      }

      tmpArray.push(currElement);
      console.log("HI");
      if (currElement.isEndParagraph && currElement.isEndParagraph === "True") {
        console.log("HERE?");
        // Construct
        const renderTag = (
          <RegularText key={key}>
            {tmpArray.map((item) => {
              console.log(item.verseNum);

              const currVerseNum = item.verseNum;
              key += 2;
              return (
                <TextNoNewline
                  verse={currVerseNum}
                  reset={isReset}
                  onPress={(e) => handleTextPress(e, 999)}
                  // onLayout={handleTextLayout}
                  yellowHighlightIds={yellowHighlightIds}
                  comments={comments}
                  selectedComment={currVerseComment}
                  key={key + 2}
                >
                  <VerseText key={key + 1}>{" " + currVerseNum}</VerseText>
                  {item.verse}
                </TextNoNewline>
              );
            })}
          </RegularText>
        );

        key += 3;

        tmpArray = [];

        setRenderTags(renderTag);
        // appendToRenderTags(renderTag);

        // renderTags.push(renderTag);
      }
      if (key > 10) {
        break;
      }
    }
  };

  // Handle automatic closing of footer when no underlines
  // useEffect(() => {
  //   console.log("here");
  //   if (underlineIds.size === 0) {
  //     setShowFooter(false);
  //   } else {
  //     setShowFooter(true);
  //   }
  // }, [underlineIds]);

  const handleTextPress = (event, verse) => {
    console.log("underlineIds2 ======");
    console.log(underlineIds2);

    if (isReset) {
      setIsReset(false);
    }

    // If clicking on a comment...
    // if (verse in comments) {
    //   setUnderlineIds(new Set());
    //   setCurrVerseComment(verse);
    //   setShowCommentFooter(true);
    //   setShowFooter(true);
    //   setIsReset(true);
    //   return;
    // }

    // setCurrVerseComment(null);
    // setShowCommentFooter(false);
    // setShowFooter(true);
    // hideCommentInput();

    if (scrollViewRef.current && event?.nativeEvent) {
      // Handle footer
      console.log(underlineIds2.includes(verse));
      if (numInUnderlineIds(verse)) {
        removeFromUnderlineIds(verse);

        console.log("HAS VERSE");
        // setUnderlineIds(new Set([2]));
      } else {
        console.log("DOES NOT HAVE VERSE");
        // setUnderlineIds(new Set([1]));

        appendToUnderlineIds(verse);

        // appendToUnderlineIds(verse);
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
      console.log("underlineIds end =======");
      console.log(underlineIds2);
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
  const numInUnderlineIds = (number) => {
    return underlineIds2.includes(number);
  };

  const appendToUnderlineIds = (number) => {
    setUnderlineIds2((prevUnderlineIds) => [...prevUnderlineIds, number]);
  };

  const removeFromUnderlineIds = (number) => {
    setUnderlineIds2((prevUnderlineIds) =>
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

  // var renderTags = [];
  // var tmpArray = [];
  // for (let i = 0; i < Object.keys(passage).length; i++) {
  //   var currElement = passage[i];
  //   // If it's a header
  //   if (currElement.isHeading === "True") {
  //     if (tmpArray.length > 0) {
  //       const renderTagOld = (
  //         <RegularText key={Object.keys(renderTags).length}>
  //           {tmpArray.map((item) => {
  //             return (
  //               <TextNoNewline
  //                 verse={item.verseNum}
  //                 reset={isReset}
  //                 onPress={(e) => handleTextPress(e, item.verseNum)}
  //                 onLayout={handleTextLayout}
  //                 yellowHighlightIds={yellowHighlightIds}
  //                 comments={comments}
  //                 selectedComment={currVerseComment}
  //                 key={item.verseNum}
  //               >
  //                 <VerseText
  //                   class="verse-num"
  //                   id="v01001011-1"
  //                   key={item.verseNum}
  //                 >
  //                   {" " + item.verseNum}
  //                 </VerseText>
  //                 {item.verse}
  //               </TextNoNewline>
  //             );
  //           })}
  //         </RegularText>
  //       );
  //       tmpArray = [];
  //       renderTags.push(renderTagOld);
  //     }

  //     const renderTagHeader = (
  //       <HeaderText key={Object.keys(renderTags).length}>
  //         {currElement.verse}
  //       </HeaderText>
  //     );
  //     renderTags.push(renderTagHeader);
  //   } else {
  //     tmpArray.push(currElement);
  //   }

  //   if (currElement.isEndParagraph && currElement.isEndParagraph === "True") {
  //     // Construct
  //     const renderTag = (
  //       <RegularText key={Object.keys(renderTags).length}>
  //         {tmpArray.map((item) => {
  //           return (
  //             <TextNoNewline
  //               verse={item.verseNum}
  //               reset={isReset}
  //               onPress={(e) => handleTextPress(e, item.verseNum)}
  //               onLayout={handleTextLayout}
  //               yellowHighlightIds={yellowHighlightIds}
  //               comments={comments}
  //               selectedComment={currVerseComment}
  //               key={item.verseNum}
  //             >
  //               <VerseText
  //                 class="verse-num"
  //                 id="v01001011-1"
  //                 key={item.verseNum}
  //               >
  //                 {" " + item.verseNum}
  //               </VerseText>
  //               {item.verse}
  //             </TextNoNewline>
  //           );
  //         })}
  //       </RegularText>
  //     );

  //     tmpArray = [];
  //     renderTags.push(renderTag);
  //   }
  // }

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
        <TouchableOpacity onPress={setPassage}>
          <Text style={{ color: "white" }}>TOUCH ME</Text>
        </TouchableOpacity>
        {test1}
        <TextNoNewline
          verse={1}
          reset={isReset}
          onPress={(e) => handleTextPress(e, 1)}
          // onLayout={handleTextLayout}
          yellowHighlightIds={yellowHighlightIds}
          comments={comments}
          selectedComment={currVerseComment}
        >
          <VerseText>{" " + 1}</VerseText>
          item.verse
        </TextNoNewline>
        {[
          <TextNoNewline
            verse={1}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 1)}
            // onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
            key={1}
          >
            <VerseText>{" " + 1}</VerseText>
            I"M IN AN ARRAY
          </TextNoNewline>,
        ]}
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
