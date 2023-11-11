import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {
  todos: {
    title: string;
    isComplete: string;
  };
};

const TodosScreen = (props: Props) => {
  return (
    <View>
      <Text>TodosScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default TodosScreen;
