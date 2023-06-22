import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
  findNodeHandle,
  UIManager,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import React, { useRef, useState } from "react";

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

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      // Only activate the pan responder if the gesture is moving downwards
      // const isWithinSwipeRef = swipeRef && swipeRef.current;
      // return gestureState.dy > 0 && isWithinSwipeRef;

      onPanResponderMove: (_, gestureState) => {
        // Update the position of the footer as the user drags it downwards
        footerPosition.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        // If the user has dragged the footer down by more than half of its height,
        // animate it out of view, otherwise animate it back to its original position
        if (gestureState.dy > FOOTER_HEIGHT / 2) {
          animateFooterOut();
        } else {
          animateFooterBack();
        }
      },
    })
  ).current;

  const FOOTER_HEIGHT = height; // Replace with the actual height of your footer
  const footerPosition = useRef(new Animated.Value(0)).current;

  const animateFooterOut = () => {
    Animated.timing(footerPosition, {
      toValue: FOOTER_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
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
    });
  };
  const animateFooterBack = () => {
    Animated.timing(footerPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const footerStyle = {
    transform: [
      {
        translateY: footerPosition,
      },
    ],
  };

  if (!isVisible) {
    return null;
  } else {
    return (
      <>
        <GestureHandlerRootView>
          <Animated.View
            style={[
              {
                position: "absolute",
                bottom: -1 * (900 - height),
                left: 0,
                right: 0,
                height: 900, // Replace with the actual height of your footer
                backgroundColor: "#0a0a0a",
                borderTopWidth: 1,
                borderTopColor: "black",
                padding: 10,
              },
              footerStyle,
            ]}
          >
            <PanGestureHandler>
              <View style={styles.handle} />
            </PanGestureHandler>
            {children}
          </Animated.View>
        </GestureHandlerRootView>
      </>
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
