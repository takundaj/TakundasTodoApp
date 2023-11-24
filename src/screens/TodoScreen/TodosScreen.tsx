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
import { sortByTitle } from "../../utils/helpers";
import { Gesture } from "react-native-gesture-handler";
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
  const pan = Gesture.Pan();

  const completeTodo = (newTodo: Todo) => {
    let newTodosArray = todos?.filter((todo) => todo.title !== newTodo.title);

    newTodosArray?.push({
      title: newTodo.title,
      isDone: newTodo.isDone,
    });

    // update firestore record to reflect completed todo
    firestore()
      .collection("TodoGroups")
      .doc(route.params.groupId)
      .update({
        todos: sortByTitle(newTodosArray),
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
        .doc(route.params.groupId)
        .update({
          todos: sortByTitle([
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
      .doc(route.params.groupId)
      .update({
        todos: sortByTitle(newTodosArray),
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
      .doc(route.params.groupId)
      .onSnapshot(
        (documentSnapshot) => {
          setTodos(sortByTitle(documentSnapshot?.data()?.todos));
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
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={32} />
            </TouchableOpacity>
            <Text style={styles.title}>{route.params.groupTitle}</Text>
            <Text style={styles.progressText}>{`${
              todos?.filter((todo) => todo.isDone).length
            } / ${todos?.length}`}</Text>
          </View>
          {todos?.length !== 0 ? (
            <FlatList
              style={styles.list}
              data={sortByTitle(todos)}
              renderItem={({ item }) => (
                <TodoItem
                  title={item.title}
                  isChecked={item.isDone}
                  onCompleteTodo={completeTodo}
                  todos={todos}
                  groupId={route.params.groupId}
                  color={route.params.groupColor}
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
                { backgroundColor: route.params.groupColor || "turquoise" },
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
