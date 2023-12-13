import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/navigationTypes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { sortByDate } from "../../utils/helpers";
import CustomButton from "../../components/CustomButtons";
import styles from "./todoModal.style";

type TodoModalNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "TodoModal"
>;

type TodoModalRouteProp = RouteProp<StackParamList, "TodoModal">;

const TodoModal = () => {
  const navigation = useNavigation<TodoModalNavigationProp>();
  const route = useRoute<TodoModalRouteProp>();
  const [inputValue, setInputValue] = useState(route.params.title);
  const [todos] = useState(route.params.todos);

  const updateTodo = (newTodo: FirebaseFirestoreTypes.DocumentData) => {
    if (newTodo?.title?.trim() === route?.params?.title?.trim()) {
      navigation.goBack();
      return;
    }

    const newArray = todos?.filter((todo) => todo.title !== route.params.title);
    newArray?.push(newTodo);

    if (inputValue?.trim() !== "" && route.params.groupId) {
      firestore()
        .collection("TodoGroups")
        .doc(route.params.groupId)
        .update({
          todos: sortByDate(newArray),
        })
        .then(() => {
          console.log(`${newTodo} - Group updated!`);
          navigation.goBack();
        })
        .catch((error) => {
          console.log("Failed to add group - ", error);
        });
    }
  };

  return (
    <View style={styles.container} testID="todo-modal-container">
      <View
        style={[styles.header, { height: Dimensions.get("screen").height / 3 }]}
      >
        <Text style={styles.headerText}>Edit To Do</Text>
        <View style={styles.inputContainer}>
          <TextInput value={inputValue} onChangeText={setInputValue} />
        </View>
        <CustomButton
          onPress={() =>
            updateTodo({ title: inputValue?.trim(), isDone: false })
          }
          label={"Add group"}
          disabled={inputValue?.trim() === ""}
          type={"primary"}
        />
        <CustomButton
          onPress={() => navigation.goBack()}
          label={"Cancel"}
          disabled={inputValue?.trim() === ""}
          type={"cancel"}
        />
      </View>
    </View>
  );
};

export default TodoModal;
