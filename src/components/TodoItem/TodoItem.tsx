import { Animated, Text, TouchableOpacity, Alert } from "react-native";
import React, { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Todo } from "../../types/data";
import { Swipeable } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import styles from "./todoItem.styles";

type Props = {
  title?: string;
  isChecked: boolean;
  onCompleteTodo: (newTodo: Todo) => void;
  todos?: FirebaseFirestoreTypes.DocumentData[];
  deleteTodo: () => void;
  color: string;
  groupId?: string;
};

type TodoItemNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "TodoModal"
>;

const TodoItem = ({
  title,
  groupId,
  isChecked,
  onCompleteTodo,
  todos,
  deleteTodo,
  color,
}: Props) => {
  const navigation = useNavigation<TodoItemNavigationProp>();

  const swipeableRef = useRef<Swipeable>(null);

  const triggerAlert = () => {
    Alert.alert("Are you sure you want to delete this item?", "", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => deleteTodo(),
      },
    ]);

    swipeableRef.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.swipeActionRight}
          onPress={triggerAlert}
        >
          <Ionicons name="trash" size={24} color={"red"} />
        </TouchableOpacity>
      )}
      renderLeftActions={() => (
        <TouchableOpacity
          style={styles.swipeActionLeft}
          onPress={() => {
            navigation.navigate("TodoModal", { title, groupId, todos });
            swipeableRef?.current?.close();
          }}
        >
          <Ionicons name="md-pencil" size={24} color={"orange"} />
        </TouchableOpacity>
      )}
    >
      <Animated.View style={styles.swipeableContainer}>
        <Text>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            title ? onCompleteTodo({ title: title, isDone: !isChecked }) : null
          }
        >
          <Ionicons
            name={isChecked ? "checkmark-circle" : "checkmark-circle"}
            size={30}
            color={isChecked ? color || "turquoise" : "lightgrey"}
          />
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  );
};

export default TodoItem;
