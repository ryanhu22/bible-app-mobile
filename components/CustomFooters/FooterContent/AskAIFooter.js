import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { explainAPI } from "../../../api/openai_api";
import { TypingAnimation } from "react-native-typing-animation";
import React, { useRef, useState, useEffect } from "react";

// TODO:
// 1. Add a "history", where you can swipe or click button to check out previous histories
const AskAIFooter = ({
  book,
  chapter,
  underlineIds,
  sendCustomComment,
  hideAI,
}) => {
  const [explainText, setExplainText] = useState("What can I help answer?");
  const [nextQuestion, setNextQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");

  const explain = async (question) => {
    // const response = await explainAPI(question);
    const response = `This is a mock response for AI Footer. Your question was ${question}`;
    setExplainText(response);
  };

  const askNextQuestion = async () => {
    setNextQuestion("");
    setExplainText("");
    setCurrentQuestion(nextQuestion);
    await explain(
      `I'm currently reading ${book}, chapter ${chapter} and I have the current verses highlighted: ${underlineIds}. My question is: ${nextQuestion}`
    );
  };

  const addComment = () => {
    sendCustomComment(explainText);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }} onPress={hideAI}>
          <AntDesign name="back" size={20} color="#20c7fa" />
          <Text style={{ color: "#20c7fa" }}>Back</Text>
        </TouchableOpacity>
        <View>
          {currentQuestion ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: "white", paddingHorizontal: 5 }}
            >
              {`Verses ${underlineIds}: ${currentQuestion}`}
            </Text>
          ) : (
            <Text style={{ color: "white" }}>
              Selected verses:{" "}
              {underlineIds.map((verseNum, index) => {
                return (
                  <Text key={index} style={{ color: "white" }}>
                    <Text style={{ fontWeight: "bold" }}>{verseNum}</Text>,{" "}
                  </Text>
                );
              })}
            </Text>
          )}
        </View>
        <View></View>
      </View>

      {explainText ? (
        // I don't like how height is hard coded
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: "#c7c5c5",
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            {currentQuestion}
          </Text>
          <View style={{ alignItems: "center" }}>
            <ScrollView
              style={{
                height: 230,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ color: "white", marginBottom: 10 }}>
                {explainText}
              </Text>
            </ScrollView>
            {currentQuestion ? (
              <TouchableOpacity onPress={addComment}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SimpleLineIcons
                    name="note"
                    size={24}
                    color="white"
                    style={{ paddingBottom: 5 }}
                  />
                  <Text style={{ color: "white" }}>
                    {" "}
                    Add explanation as a note
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ) : (
        // I don't like how height is hard coded
        <View
          style={{
            height: 230,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", marginBottom: 10 }}>
            Waiting for a response
          </Text>
          <TypingAnimation
            dotColor="white"
            dotMargin={5}
            dotAmplitude={3}
            dotSpeed={0.15}
            dotRadius={2.5}
            dotX={0}
            dotY={0}
          />
        </View>
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#141414",
            margin: 20,
            padding: 15,
            height: 50,
            borderWidth: 1,
            borderColor: "white",
            flex: 1,
          }}
        >
          <TextInput
            style={{
              color: "white",
              fontSize: 15,
            }}
            multiline={true}
            autoFocus={true}
            placeholder="Ask a follow-up..."
            placeholderTextColor={"#8d8d8d"}
            onChangeText={setNextQuestion}
            value={nextQuestion}
          />
        </View>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={askNextQuestion}
        >
          <Feather name="send" size={18} color="#20c7fa" />
          <Text style={{ color: "#20c7fa" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AskAIFooter;
