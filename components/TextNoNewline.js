import React, { forwardRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const TextNoNewline = forwardRef((props, ref) => {
  const [isUnderline, setIsUnderline] = useState(false);
  const toggleUnderline = (event) => {
    setIsUnderline(!isUnderline);
    props.onPress && props.onPress(event);
  };

  return (
    <Text
      {...props}
      ref={ref}
      style={[
        { color: "white" },
        isUnderline && {
          textDecorationLine: "underline",
          backgroundColor: "lightyellow",
          color: "black",
        },
      ]}
      onPress={toggleUnderline}
      onLayout={props.onLayout}
    />
  );
});

export default TextNoNewline;
