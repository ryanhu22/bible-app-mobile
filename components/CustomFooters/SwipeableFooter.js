import { View, StyleSheet, PanResponder, Animated } from "react-native";

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
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only activate the pan responder if the gesture is moving downwards
        return gestureState.dy > 0;
      },
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
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: -780,
    left: 0,
    right: 0,
    height: 900, // Replace with the actual height of your footer
    backgroundColor: "#0a0a0a",
    borderTopWidth: 1,
    borderTopColor: "black",
    padding: 10,
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
    width: 30,
    height: 5,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default SwipeableFooter;
