import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/navigationTypes";
import styles from "./groupCard.style";

type Props = {
  title?: string;
  groupId?: string;
  groupColor: string;
  numberOfTodos?: number;
};

type GroupCardNavigationProp = NativeStackNavigationProp<StackParamList>;

const GroupCard = ({ title, numberOfTodos, groupId, groupColor }: Props) => {
  const navigation = useNavigation<GroupCardNavigationProp>();

  const handleOnPress = () => {
    navigation.navigate("TodosScreen", {
      groupTitle: title,
      groupId,
      groupColor,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPress}
      onLongPress={() =>
        navigation.navigate("GroupModal", {
          groupTitle: title,
          groupColor,
          groupId,
        })
      }
      testID="group-card-container"
    >
      <View
        style={[
          styles.innerContainer,
          { borderColor: groupColor || "turquoise" },
        ]}
      >
        <Ionicons
          name="list-outline"
          size={32}
          color={groupColor || "turquoise"}
        />
        <View>
          <Text style={styles.groupTitle}>{title}</Text>
          <Text style={styles.todoCount}>{numberOfTodos} Tasks</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupCard;
