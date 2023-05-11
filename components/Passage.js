import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import RegularText from "./RegularText";
import VerseText from "./VerseText";
import HeaderText from "./HeaderText";
import TextNoNewline from "./TextNoNewline";
import React, { useRef, useState } from "react";

const Passage = ({ html_str }) => {
  const scrollViewRef = useRef(null);
  const [textLayout, setTextLayout] = useState(null);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const handleTextPress = (event) => {
    if (scrollViewRef.current && event?.nativeEvent) {
      console.log(event.nativeEvent);
      console.log(event.target);
      const pageY = event.nativeEvent.pageY - 50;
      console.log("ScrollViewHeight: ", scrollViewHeight);
      console.log("PageY: " + pageY);
      //   const scrollOffset = pageY + 250 - scrollViewHeight;
      const scrollOffset = scrollViewHeight - pageY;
      // No need to scroll
      if (scrollOffset > 100) {
        return;
      } else if (scrollOffset < 0) {
        return;
      }
      const scrollUp = 200 - scrollOffset; // 200 is how big of a footer you want to display.
      console.log("ScrollOffset", scrollOffset);
      scrollViewRef.current.scrollTo({
        y: scrollUp,
        animated: true,
      });
    }
  };

  const handleTextLayout = (event) => {
    const { layout } = event.nativeEvent;
    setTextLayout(layout);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setScrollViewHeight(height);
      }}
      style={{ paddingHorizontal: 15 }}
    >
      <HeaderText id="p01001001_01-1">The Creation of the World</HeaderText>
      <RegularText id="p01001001_06-1" class="starts-chapter">
        <TextNoNewline>
          <VerseText class="chapter-num" id="v01001001-1">
            1:1&nbsp;
          </VerseText>
          In the beginning, God created the heavens and the earth.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001002-1">
            2&nbsp;
          </VerseText>
          The earth was without form and void, and darkness was over the face of
          the deep. And the Spirit of God was hovering over the face of the
          waters.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001002_06-1">
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001003-1">
            3&nbsp;
          </VerseText>
          And God said, “Let there be light,” and there was light.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001004-1">
            4&nbsp;
          </VerseText>
          And God saw that the light was good. And God separated the light from
          the darkness.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001005-1">
            5&nbsp;
          </VerseText>
          God called the light Day, and the darkness he called Night. And there
          was evening and there was morning, the first day.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001005_06-1">
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001006-1">
            6&nbsp;
          </VerseText>
          And God said, “Let there be an expanse in the midst of the waters, and
          let it separate the waters from the waters.”{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001007-1">
            7&nbsp;
          </VerseText>
          And God made the expanse and separated the waters that were under the
          expanse from the waters that were above the expanse. And it was so.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001008-1">
            8&nbsp;
          </VerseText>
          And God called the expanse Heaven. And there was evening and there was
          morning, the second day.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001008_06-1">
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001009-1">
            9&nbsp;
          </VerseText>
          And God said, “Let the waters under the heavens be gathered together
          into one place, and let the dry land appear.” And it was so.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001010-1">
            10&nbsp;
          </VerseText>
          God called the dry land Earth, and the waters that were gathered
          together he called Seas. And God saw that it was good.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001010_06-1">
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001011-1">
            11&nbsp;
          </VerseText>
          And God said, “Let the earth sprout vegetation, plants yielding seed,
          and fruit trees bearing fruit in which is their seed, each according
          to its kind, on the earth.” And it was so.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001012-1">
            12&nbsp;
          </VerseText>
          The earth brought forth vegetation, plants yielding seed according to
          their own kinds, and trees bearing fruit in which is their seed, each
          according to its kind. And God saw that it was good.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001013-1">
            13&nbsp;
          </VerseText>
          And there was evening and there was morning, the third day.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001013_06-1">
        <TextNoNewline onPress={handleTextPress} onLayout={handleTextLayout}>
          <VerseText class="verse-num" id="v01001014-1">
            14&nbsp;
          </VerseText>
          And God said, “Let there be lights in the expanse of the heavens to
          separate the day from the night. And let them be for signs and for
          seasons, and for days and years,{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001015-1">
            15&nbsp;
          </VerseText>
          and let them be lights in the expanse of the heavens to give light
          upon the earth.” And it was so.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001016-1">
            16&nbsp;
          </VerseText>
          And God made the two great lights—the greater light to rule the day
          and the lesser light to rule the night—and the stars.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001017-1">
            17&nbsp;
          </VerseText>
          And God set them in the expanse of the heavens to give light on the
          earth,{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001018-1">
            18&nbsp;
          </VerseText>
          to rule over the day and over the night, and to separate the light
          from the darkness. And God saw that it was good.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001019-1">
            19&nbsp;
          </VerseText>
          And there was evening and there was morning, the fourth day.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001019_06-1">
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001020-1">
            20&nbsp;
          </VerseText>
          And God said, “Let the waters swarm with swarms of living creatures,
          and let birds fly above the earth across the expanse of the heavens.”{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001021-1">
            21&nbsp;
          </VerseText>
          So God created the great sea creatures and every living creature that
          moves, with which the waters swarm, according to their kinds, and
          every winged bird according to its kind. And God saw that it was good.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001022-1">
            22&nbsp;
          </VerseText>
          And God blessed them, saying, “Be fruitful and multiply and fill the
          waters in the seas, and let birds multiply on the earth.”{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001023-1">
            23&nbsp;
          </VerseText>
          And there was evening and there was morning, the fifth day.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001023_06-1">
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001024-1">
            24&nbsp;
          </VerseText>
          And God said, “Let the earth bring forth living creatures according to
          their kinds—livestock and creeping things and beasts of the earth
          according to their kinds.” And it was so.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001025-1">
            25&nbsp;
          </VerseText>
          And God made the beasts of the earth according to their kinds and the
          livestock according to their kinds, and everything that creeps on the
          ground according to its kind. And God saw that it was good.
        </TextNoNewline>
      </RegularText>
      <RegularText id="p01001025_06-1">
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001026-1">
            26&nbsp;
          </VerseText>
          Then God said, “Let us make man in our image, after our likeness. And
          let them have dominion over the fish of the sea and over the birds of
          the heavens and over the livestock and over all the earth and over
          every creeping thing that creeps on the earth.”
        </TextNoNewline>
      </RegularText>

      <RegularText class="block-indent">
        <TextNoNewline>
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
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001028-1">
            28&nbsp;
          </VerseText>
          And God blessed them. And God said to them, “Be fruitful and multiply
          and fill the earth and subdue it, and have dominion over the fish of
          the sea and over the birds of the heavens and over every living thing
          that moves on the earth.”{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001029-1">
            29&nbsp;
          </VerseText>
          And God said, “Behold, I have given you every plant yielding seed that
          is on the face of all the earth, and every tree with seed in its
          fruit. You shall have them for food.{" "}
        </TextNoNewline>
        <TextNoNewline>
          <VerseText class="verse-num" id="v01001030-1">
            30&nbsp;
          </VerseText>
          And to every beast of the earth and to every bird of the heavens and
          to everything that creeps on the earth, everything that has the breath
          of life, I have given every green plant for food.” And it was so.{" "}
        </TextNoNewline>
        <TextNoNewline onPress={handleTextPress} onLayout={handleTextLayout}>
          <VerseText class="verse-num" id="v01001031-1">
            31&nbsp;
          </VerseText>
          And God saw everything that he had made, and behold, it was very good.
          And there was evening and there was morning, the sixth day.
        </TextNoNewline>
      </RegularText>
    </ScrollView>
  );
};

export default Passage;
