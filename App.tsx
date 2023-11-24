import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./src/types/navigationTypes";
import GroupsScreen from "./src/screens/GroupScreen";
import TodosScreen from "./src/screens/TodoScreen";
import AddGroupScreen from "./src/screens/AddGroupScreen";
import GroupModal from "./src/screens/GroupModal";
import TodoModal from "./src/screens/TodoModal";

export default function App() {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={"GroupsScreen"} component={GroupsScreen} />
          <Stack.Screen name={"TodosScreen"} component={TodosScreen} />
          <Stack.Group screenOptions={{ presentation: "formSheet" }}>
            <Stack.Screen name={"AddGroupScreen"} component={AddGroupScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name={"GroupModal"} component={GroupModal} />
            <Stack.Screen name={"TodoModal"} component={TodoModal} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
