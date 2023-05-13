import React from "react";
import { Text } from "react-native";

const HeaderText = ({ children, ...props }) => {
  return (
    <Text
      style={{
        color: "white",
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default HeaderText;
