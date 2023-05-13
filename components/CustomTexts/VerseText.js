import React from "react";
import { Text, View } from "react-native";

const VerseText = ({ children, ...props }) => {
  return (
    <Text
      style={{
        fontSize: 10,
        textAlignVertical: "top",
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default VerseText;
