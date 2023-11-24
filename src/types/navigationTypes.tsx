import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Group, Todo } from "./data";

export type StackParamList = {
  GroupsScreen: undefined;
  TodosScreen: {
    todos?: Todo[];
    groupTitle?: string;
    groupColor: string;
    groupId?: string;
  };
  AddGroupScreen: undefined;
  AddTodoScreen: undefined;
  GroupModal: { groupTitle?: string; groupId?: string; groupColor?: string };
  TodoModal: {
    title?: string;
    groupId?: string | undefined;
    todos?: FirebaseFirestoreTypes.DocumentData[];
  };
};
