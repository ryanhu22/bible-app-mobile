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
        animated: true,
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

  const test = async () => {
    await db()
      .ref("/test/123")
      .set({
        name: "Ryan",
        count: [1, 4, 1],
      });
    const name = await db().ref("/test/123");
    // Attach a listener to retrieve the data when it changes
    name.on("value", (snapshot) => {
      const data = snapshot.val(); // This will be an object containing the data at the node

      if (data) {
        const name = data.name; // Assuming there is a "name" property in the object
        console.log(name); // Do something with the name
      }
    });
  };

  const test2 = () => {
    const html_string = `<h3 id="p01001001_01-1">The Creation of the World</h3>
    <p id="p01001001_06-1" class="starts-chapter"><b class="chapter-num" id="v01001001-1">1:1&nbsp;</b>In the beginning, God created the heavens and the earth. <b class="verse-num" id="v01001002-1">2&nbsp;</b>The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.</p>
    <p id="p01001002_06-1"><b class="verse-num" id="v01001003-1">3&nbsp;</b>And God said, “Let there be light,” and there was light. <b class="verse-num" id="v01001004-1">4&nbsp;</b>And God saw that the light was good. And God separated the light from the darkness. <b class="verse-num" id="v01001005-1">5&nbsp;</b>God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.</p>`;
    let doc = new DomParser().parseFromString(html_string, "text/html");

    console.log(doc);
    // doc.map((node, index) => {
    //   console.log(index);
    //   console.log(node);
    // });
  };

  const test_html = `<h3 id="p01001001_01-1">The Creation of the World</h3>
  <p id="p01001001_06-1" class="starts-chapter"><b class="chapter-num" id="v01001001-1">1:1&nbsp;</b>In the beginning, God created the heavens and the earth. <b class="verse-num" id="v01001002-1">2&nbsp;</b>The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.</p>
  <p id="p01001002_06-1"><b class="verse-num" id="v01001003-1">3&nbsp;</b>And God said, “Let there be light,” and there was light. <b class="verse-num" id="v01001004-1">4&nbsp;</b>And God saw that the light was good. And God separated the light from the darkness. <b class="verse-num" id="v01001005-1">5&nbsp;</b>God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.</p>`;

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
        <HeaderText id="p01001001_01-1">The Creation of the World</HeaderText>
        <RegularText id="p01001001_06-1" class="starts-chapter">
          <TextNoNewline
            verse={1}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 1)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="chapter-num" id="v01001001-1">
              1:1&nbsp;
            </VerseText>
            In the beginning, God created the heavens and the earth.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={2}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 2)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001002-1">
              2&nbsp;
            </VerseText>
            The earth was without form and void, and darkness was over the face
            of the deep. And the Spirit of God was hovering over the face of the
            waters.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001002_06-1">
          <TextNoNewline
            verse={3}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 3)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001003-1">
              3&nbsp;
            </VerseText>
            And God said, “Let there be light,” and there was light.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={4}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 4)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001004-1">
              4&nbsp;
            </VerseText>
            And God saw that the light was good. And God separated the light
            from the darkness.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={5}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 5)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001005-1">
              5&nbsp;
            </VerseText>
            God called the light Day, and the darkness he called Night. And
            there was evening and there was morning, the first day.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001005_06-1">
          <TextNoNewline
            verse={6}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 6)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001006-1">
              6&nbsp;
            </VerseText>
            And God said, “Let there be an expanse in the midst of the waters,
            and let it separate the waters from the waters.”{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={7}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 7)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001007-1">
              7&nbsp;
            </VerseText>
            And God made the expanse and separated the waters that were under
            the expanse from the waters that were above the expanse. And it was
            so.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={8}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 8)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001008-1">
              8&nbsp;
            </VerseText>
            And God called the expanse Heaven. And there was evening and there
            was morning, the second day.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001008_06-1">
          <TextNoNewline
            verse={9}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 9)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001009-1">
              9&nbsp;
            </VerseText>
            And God said, “Let the waters under the heavens be gathered together
            into one place, and let the dry land appear.” And it was so.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={10}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 10)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001010-1">
              10&nbsp;
            </VerseText>
            God called the dry land Earth, and the waters that were gathered
            together he called Seas. And God saw that it was good.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001010_06-1">
          <TextNoNewline
            verse={11}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 11)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001011-1">
              11&nbsp;
            </VerseText>
            And God said, “Let the earth sprout vegetation, plants yielding
            seed, and fruit trees bearing fruit in which is their seed, each
            according to its kind, on the earth.” And it was so.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={12}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 12)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001012-1">
              12&nbsp;
            </VerseText>
            The earth brought forth vegetation, plants yielding seed according
            to their own kinds, and trees bearing fruit in which is their seed,
            each according to its kind. And God saw that it was good.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={13}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 13)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001013-1">
              13&nbsp;
            </VerseText>
            And there was evening and there was morning, the third day.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001013_06-1">
          <TextNoNewline
            verse={14}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 14)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001014-1">
              14&nbsp;
            </VerseText>
            And God said, “Let there be lights in the expanse of the heavens to
            separate the day from the night. And let them be for signs and for
            seasons, and for days and years,{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={15}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 15)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001015-1">
              15&nbsp;
            </VerseText>
            and let them be lights in the expanse of the heavens to give light
            upon the earth.” And it was so.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={16}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 16)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001016-1">
              16&nbsp;
            </VerseText>
            And God made the two great lights—the greater light to rule the day
            and the lesser light to rule the night—and the stars.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={17}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 17)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001017-1">
              17&nbsp;
            </VerseText>
            And God set them in the expanse of the heavens to give light on the
            earth,{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={18}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 18)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001018-1">
              18&nbsp;
            </VerseText>
            to rule over the day and over the night, and to separate the light
            from the darkness. And God saw that it was good.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={19}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 19)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001019-1">
              19&nbsp;
            </VerseText>
            And there was evening and there was morning, the fourth day.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001019_06-1">
          <TextNoNewline
            verse={20}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 20)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001020-1">
              20&nbsp;
            </VerseText>
            And God said, “Let the waters swarm with swarms of living creatures,
            and let birds fly above the earth across the expanse of the
            heavens.”{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={21}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 21)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001021-1">
              21&nbsp;
            </VerseText>
            So God created the great sea creatures and every living creature
            that moves, with which the waters swarm, according to their kinds,
            and every winged bird according to its kind. And God saw that it was
            good.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={22}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 22)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001022-1">
              22&nbsp;
            </VerseText>
            And God blessed them, saying, “Be fruitful and multiply and fill the
            waters in the seas, and let birds multiply on the earth.”{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={23}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 23)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001023-1">
              23&nbsp;
            </VerseText>
            And there was evening and there was morning, the fifth day.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001023_06-1">
          <TextNoNewline
            verse={24}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 24)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001024-1">
              24&nbsp;
            </VerseText>
            And God said, “Let the earth bring forth living creatures according
            to their kinds—livestock and creeping things and beasts of the earth
            according to their kinds.” And it was so.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={25}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 25)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001025-1">
              25&nbsp;
            </VerseText>
            And God made the beasts of the earth according to their kinds and
            the livestock according to their kinds, and everything that creeps
            on the ground according to its kind. And God saw that it was good.
          </TextNoNewline>
        </RegularText>
        <RegularText id="p01001025_06-1">
          <TextNoNewline
            verse={26}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 26)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001026-1">
              26&nbsp;
            </VerseText>
            Then God said, “Let us make man in our image, after our likeness.
            And let them have dominion over the fish of the sea and over the
            birds of the heavens and over the livestock and over all the earth
            and over every creeping thing that creeps on the earth.”
          </TextNoNewline>
        </RegularText>

        <RegularText class="block-indent">
          <TextNoNewline
            verse={27}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 27)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <RegularText class="begin-line-group"></RegularText>
            <RegularText id="p01001027_06-1" class="line">
              <VerseText class="verse-num inline" id="v01001027-1">
                27&nbsp;
              </VerseText>
              &nbsp;&nbsp;So God created man in his own image,
            </RegularText>
            <Text>{"\n"}</Text>
            <RegularText id="p01001027_06-1" class="indent line">
              &nbsp;&nbsp;&nbsp;&nbsp;in the image of God he created him;
            </RegularText>
            <Text>{"\n"}</Text>
            <RegularText id="p01001027_06-1" class="indent line">
              &nbsp;&nbsp;&nbsp;&nbsp;male and female he created them.
            </RegularText>
            <Text>{"\n"}</Text>
            <RegularText class="end-line-group"></RegularText>
          </TextNoNewline>
        </RegularText>

        <RegularText id="p01001027_06-1">
          <TextNoNewline
            verse={28}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 28)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001028-1">
              28&nbsp;
            </VerseText>
            And God blessed them. And God said to them, “Be fruitful and
            multiply and fill the earth and subdue it, and have dominion over
            the fish of the sea and over the birds of the heavens and over every
            living thing that moves on the earth.”{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={29}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 29)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001029-1">
              29&nbsp;
            </VerseText>
            And God said, “Behold, I have given you every plant yielding seed
            that is on the face of all the earth, and every tree with seed in
            its fruit. You shall have them for food.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={30}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 30)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001030-1">
              30&nbsp;
            </VerseText>
            And to every beast of the earth and to every bird of the heavens and
            to everything that creeps on the earth, everything that has the
            breath of life, I have given every green plant for food.” And it was
            so.{" "}
          </TextNoNewline>
          <TextNoNewline
            verse={31}
            reset={isReset}
            onPress={(e) => handleTextPress(e, 31)}
            onLayout={handleTextLayout}
            yellowHighlightIds={yellowHighlightIds}
            comments={comments}
            selectedComment={currVerseComment}
          >
            <VerseText class="verse-num" id="v01001031-1">
              31&nbsp;
            </VerseText>
            And God saw everything that he had made, and behold, it was very
            good. And there was evening and there was morning, the sixth day.
          </TextNoNewline>
        </RegularText>
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
