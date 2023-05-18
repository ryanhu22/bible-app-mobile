import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RegularText = ({ children, ...props }) => {
  return (
    <Text
      style={{ marginTop: 5, marginBottom: 5, fontSize: 16, color: "white" }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default RegularText;
