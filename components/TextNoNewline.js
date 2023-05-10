import React, { forwardRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const TextNoNewline = forwardRef((props, ref) => {
  const [isUnderline, setIsUnderline] = useState(false);
  const toggleUnderline = () => setIsUnderline(!isUnderline);

  return (
    <Text
      {...props}
      style={[
        { color: "white" },
        isUnderline && {
          textDecorationLine: "underline",
          backgroundColor: "lightyellow",
          color: "black",
        },
      ]}
      onPress={toggleUnderline}
    />
  );
});

export default TextNoNewline;
