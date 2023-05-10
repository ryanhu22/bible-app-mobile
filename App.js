import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import Header from "./components/Header";
import Passage from "./components/Passage";

const genesis_1 =
  "<h3>This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text This is genesis 1 text</h3>";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Passage html_str={genesis_1} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
