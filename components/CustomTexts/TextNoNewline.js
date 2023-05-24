import React, { forwardRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const TextNoNewline = forwardRef((props, ref) => {
  const [isUnderline, setIsUnderline] = useState(false);

  const toggleUnderline = (event) => {
    setIsUnderline(!isUnderline);
    props.onPress && props.onPress(event);
  };

  if (props.reset && isUnderline) {
    setIsUnderline(false);
  }

  // Handle comment
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

  // Handle yellow highlight
  if (props.yellowHighlightIds?.has(props.verse)) {
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

  // No syntax
  return (
    <Text
      {...props}
      ref={ref}
      style={[
        { color: "white" },
        isUnderline && {
          textDecorationLine: "underline",
          backgroundColor: null,
          color: "white",
        },
      ]}
      onPress={(e) => toggleUnderline(e)}
      onLayout={props.onLayout}
    />
  );
});

export default TextNoNewline;
