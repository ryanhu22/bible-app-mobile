import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

const SwipeableFooter = ({
  children,
  height,
  setShowFooter,
  setShowCommentFooter,
  setIsReset,
  setUnderlineIds,
  hideCommentInput,
  setCurrVerseComment,
  hideExplain,
  hideSummarize,
  hideAI,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const FOOTER_HEIGHT = height; // Replace with the actual height of your footer
  const y = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(y.value, {
          duration: 100,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  const handleCloseFooter = () => {
    setIsVisible(false);
    setShowFooter(false);
    setShowCommentFooter(false);
    setIsReset(true);
    setUnderlineIds([]);
    hideCommentInput();
    hideExplain();
    hideSummarize();
    hideAI();
    setCurrVerseComment(null);
  };

  const closeGestureHandler = useAnimatedGestureHandler({
    onStart: (e) => {
      "on start";
    },
    onActive: (e) => {
      if (e.translationY > 0) {
        y.value = e.translationY;
      }
    },
    onEnd: (e) => {
      if (y.value > FOOTER_HEIGHT / 2) {
        runOnJS(setIsVisible)(false);
        runOnJS(setShowFooter)(false);
        runOnJS(setShowCommentFooter)(false);
        runOnJS(setIsReset)(true);
        runOnJS(setUnderlineIds)([]);
        runOnJS(hideCommentInput)();
        runOnJS(hideExplain)();
        runOnJS(hideSummarize)();
        runOnJS(hideAI)();
        runOnJS(setCurrVerseComment)(null);
      } else {
        y.value = 0;
      }
    },
  });

  const animateFooterBack = () => {
    Animated.timing(footerPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (!isVisible) {
    return null;
  } else {
    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#0a0a0a",
            borderTopWidth: 1,
            borderTopColor: "black",
            padding: 10,
            height: FOOTER_HEIGHT,
          },
          animatedContainerStyle,
        ]}
      >
        <PanGestureHandler onGestureEvent={closeGestureHandler}>
          <Animated.View
            style={{
              height: 40,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <View style={styles.handle} />
            <TouchableOpacity
              onPress={handleCloseFooter}
              style={{ position: "absolute", right: 15 }}
            >
              <Entypo name="cross" size={30} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  footerInput: {
    position: "absolute",
    bottom: -450,
    left: 0,
    right: 0,
    height: 900, // Replace with the actual height of your footer
    backgroundColor: "#0a0a0a",
    borderTopWidth: 1,
    borderTopColor: "black",
    padding: 10,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 8,
    backgroundColor: "gray",
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default SwipeableFooter;
