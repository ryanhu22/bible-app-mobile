import React, { forwardRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const TextNoNewline = forwardRef((props, ref) => {
  const [isUnderline, setIsUnderline] = useState(false);
  const [highlightColor, setHighlightColor] = useState(null);
  const [textColor, setTextColor] = useState(null);

  const toggleUnderline = (event) => {
    setIsUnderline(!isUnderline);
    props.onPress && props.onPress(event);
  };

  if (props.reset && isUnderline) {
    setIsUnderline(false);
  }

  if (props.verse in props.comments) {
    if (props.selectedComment && props.selectedComment === props.verse) {
      return (
        <Text
          {...props}
          ref={ref}
          style={{
            color: "white",
            backgroundColor: "#f7bb60",
            color: "black",
          }}
          onPress={toggleUnderline}
          onLayout={props.onLayout}
        />
      );
    } else {
      return (
        <Text
          {...props}
          ref={ref}
          style={{
            color: "white",
            backgroundColor: "#faa352",
            color: "black",
          }}
          onPress={toggleUnderline}
          onLayout={props.onLayout}
        />
      );
    }
  }

  if (props.yellowHighlightIds?.has(props.verse)) {
    // setHighlightColor("lightyellow");
    // setTextColor("black");
    return (
      <Text
        {...props}
        ref={ref}
        style={{
          color: "white",
          backgroundColor: "#f2ef88",
          color: "black",
        }}
        onPress={toggleUnderline}
        onLayout={props.onLayout}
      />
    );
  }

  return (
    <Text
      {...props}
      ref={ref}
      style={[
        { color: "white" },
        isUnderline && {
          textDecorationLine: "underline",
          backgroundColor: highlightColor ? "lightyellow" : null,
          color: textColor ? "black" : "white",
        },
      ]}
      onPress={toggleUnderline}
      onLayout={props.onLayout}
    />
  );
});

export default TextNoNewline;
