import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RegularText = ({ children, ...props }) => {
  return (
    <Text
      style={{ color: "white", marginTop: 5, marginBottom: 5, fontSize: 16 }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default RegularText;
