import React from "react";
import { Text } from "react-native";

const HeaderText = ({ children, ...props }) => {
  return (
    <Text
      style={{
        color: "white",
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: "bold",
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default HeaderText;
