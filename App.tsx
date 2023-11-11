import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StackParamList } from "./src/types/navigationTypes";
import GroupsScreen from "./src/screens/GroupsScreen";
import TodosScreen from "./src/screens/TodosScreen";

export default function App() {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"GroupsScreen"} component={GroupsScreen} />
        <Stack.Screen name={"TodosScreen"} component={TodosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
