import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/navigationTypes";

type Props = {};

type GroupCardNavigationProp = NativeStackNavigationProp<StackParamList>;

const GroupCard = (props: Props) => {
  const navigation = useNavigation<GroupCardNavigationProp>();

  const handleOnPress = () => {
    navigation.navigate("TodosScreen");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <View style={styles.innerContainer}>
        <Ionicons name="list-outline" size={32} color="green" />
        <View>
          <Text style={styles.groupTitle}>All</Text>
          <Text style={styles.todoCount}>23 Tasks</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const AddGroupCard = (props: Props) => {
  const navigation = useNavigation<GroupCardNavigationProp>();

  const handleOnPress = () => {
    navigation.navigate("TodosScreen");
  };

  return (
    <TouchableOpacity style={styles.addGroupContainer} onPress={handleOnPress}>
      <Ionicons name="add-outline" size={64} color="green" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width / 2.6,
    height: 150,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    borderLeftWidth: 4,
    borderColor: "turquoise",
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  groupTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  todoCount: {
    color: "grey",
  },
  addGroupContainer: {
    width: 150,
    height: 150,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GroupCard;
