import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { StackParamList } from "../../types/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoItem from "../../components/TodoItem";
import { Todo } from "../../types/data";
import { sortByDate } from "../../utils/helpers";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./todoScreen.style";

type TodoScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "TodosScreen"
>;
type TodosScreenRouteProp = RouteProp<StackParamList, "TodosScreen">;

const TodosScreen = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const route = useRoute<TodosScreenRouteProp>();
  const [todos, setTodos] = useState<
    FirebaseFirestoreTypes.DocumentData[] | undefined
  >([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<TextInput>(null);
  const { groupId, groupTitle, groupColor } = route.params;

  const completeTodo = (newTodo: Todo) => {
    let newTodosArray = todos?.filter((todo) => todo.title !== newTodo.title);

    let oldTodo = todos?.filter((todo) => todo.title === newTodo.title)?.[0];

    newTodosArray?.push({
      title: newTodo?.title,
      isDone: newTodo?.isDone,
      createdAt: newTodo?.createdAt,
    });

    // update firestore record to reflect completed todo
    firestore()
      .collection("TodoGroups")
      .doc(groupId)
      .update({
        todos: newTodosArray,
      })
      .then(() => {
        console.log("User updated!", newTodo);
      });
  };

  const addTodo = (newTodoTitle: string) => {
    // Check that the todo doesnt already exist
    if (todos?.some((todo) => todo.title.trim() === newTodoTitle.trim())) {
      Alert.alert("Already exists!");
      inputRef?.current?.clear();
      return;
    }
    if (todos && newTodoTitle) {
      firestore()
        .collection("TodoGroups")
        .doc(groupId)
        .update({
          todos: sortByDate([
            ...todos,
            { title: newTodoTitle, isDone: false, createdAt: new Date() },
          ]),
        })
        .then(() => {
          console.log("User updated!", newTodoTitle);
          inputRef?.current?.clear();
        });
    }
  };

  //TODO: Create delete todo function
  const deleteTodo = (todo: FirebaseFirestoreTypes.DocumentData) => {
    const newTodosArray = todos?.filter((item) => item.title !== todo.title);

    firestore()
      .collection("TodoGroups")
      .doc(groupId)
      .update({
        todos: sortByDate(newTodosArray),
      })
      .then(() => {
        console.log(`${todo.title} - has been deleted updated!`);
      })
      .catch((err) => console.log(`Failed to delete - ${todo.title}`, err));
  };

  useEffect(() => {
    // Set up listener for Todos
    const subscriber = firestore()
      .collection("TodoGroups")
      .doc(groupId)
      .onSnapshot(
        (documentSnapshot) => {
          setTodos(sortByDate(documentSnapshot?.data()?.todos));
        },
        (err) => {
          console.log("Failed to fetch todos", err);
        }
      );

    // Remove listener when we leave the page
    return () => subscriber();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      testID="todos-container"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} />
            </TouchableOpacity>
            <Text style={styles.title}>{groupTitle}</Text>
            <Text style={styles.progressText}>{`${
              todos?.filter((todo) => todo.isDone).length
            } / ${todos?.length}`}</Text>
          </View>
          {todos?.length !== 0 ? (
            <FlatList
              style={styles.list}
              data={sortByDate(todos)}
              renderItem={({ item }) => (
                <TodoItem
                  title={item.title}
                  isChecked={item.isDone}
                  createdAt={item.createdAt}
                  onCompleteTodo={completeTodo}
                  todos={todos}
                  groupId={groupId}
                  color={groupColor}
                  deleteTodo={() => deleteTodo(item)}
                />
              )}
            />
          ) : (
            <View style={styles.noTodosContainer}>
              <Text
                style={[
                  styles.noTodosText,
                  { top: Dimensions.get("screen").height / 5 },
                ]}
              >
                You dont have any todos to complete
              </Text>
            </View>
          )}

          {/* Add Todo form */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Add new to do"
              value={inputValue}
              onChangeText={setInputValue}
              autoCapitalize={"none"}
              style={styles.input}
            />
            <TouchableOpacity
              style={[
                styles.submit,
                { backgroundColor: groupColor || "turquoise" },
              ]}
              onPress={() => addTodo(inputValue)}
              disabled={inputValue.trim() === ""}
            >
              <Text style={styles.submitText}>Add To Do</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TodosScreen;
