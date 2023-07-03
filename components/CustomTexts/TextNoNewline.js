import React, { forwardRef, useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

const TextNoNewline = forwardRef((props, ref) => {
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (props.underlineIds?.includes(props.verse)) {
      setIsUnderline(true);
    } else {
      setIsUnderline(false);
    }
  }, [props.underlineIds]);

  const toggleUnderline = (event) => {
    if (props.underlineIds?.includes(props.verse)) {
      setIsUnderline(false);
    } else {
      setIsUnderline(true);
    }

    // setIsUnderline(!isUnderline);
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
        style={[
          {
            color: "white",
            backgroundColor: "#f2ef88",
            color: "black",
          },
          isUnderline && {
            textDecorationLine: "underline",
          },
        ]}
        onPress={toggleUnderline}
        onLayout={props.onLayout}
      />
    );
  }

  // Handle blue highlight
  if (props.blueHighlightIds?.has(props.verse)) {
    return (
      <Text
        {...props}
        ref={ref}
        style={[
          {
            color: "white",
            backgroundColor: "#55cef2",
            color: "black",
          },
          isUnderline && {
            textDecorationLine: "underline",
          },
        ]}
        onPress={toggleUnderline}
        onLayout={props.onLayout}
      />
    );
  }

  // Handle pink highlight
  if (props.pinkHighlightIds?.has(props.verse)) {
    return (
      <Text
        {...props}
        ref={ref}
        style={[
          {
            color: "white",
            backgroundColor: "#fc65a7",
            color: "black",
          },
          isUnderline && {
            textDecorationLine: "underline",
          },
        ]}
        onPress={toggleUnderline}
        onLayout={props.onLayout}
      />
    );
  }

  // Handle green highlight
  if (props.greenHighlightIds?.has(props.verse)) {
    return (
      <Text
        {...props}
        ref={ref}
        style={[
          {
            color: "white",
            backgroundColor: "#63ff6e",
            color: "black",
          },
          isUnderline && {
            textDecorationLine: "underline",
          },
        ]}
        onPress={toggleUnderline}
        onLayout={props.onLayout}
      />
    );
  }

  // Handle purple highlight
  if (props.purpleHighlightIds?.has(props.verse)) {
    return (
      <Text
        {...props}
        ref={ref}
        style={[
          {
            color: "white",
            backgroundColor: "#c66bfa",
            color: "black",
          },
          isUnderline && {
            textDecorationLine: "underline",
          },
        ]}
        onPress={toggleUnderline}
        onLayout={props.onLayout}
      />
    );
  }

  // Handle orange highlight
  if (props.orangeHighlightIds?.has(props.verse)) {
    return (
      <Text
        {...props}
        ref={ref}
        style={[
          {
            color: "white",
            backgroundColor: "#faa466",
            color: "black",
          },
          isUnderline && {
            textDecorationLine: "underline",
          },
        ]}
        onPress={toggleUnderline}
        onLayout={props.onLayout}
      />
    );
  }

  // Handle red highlight
  if (props.redHighlightIds?.has(props.verse)) {
    return (
      <Text
        {...props}
        ref={ref}
        style={[
          {
            color: "white",
            backgroundColor: "#ff2e4d",
            color: "black",
          },
          isUnderline && {
            textDecorationLine: "underline",
          },
        ]}
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
