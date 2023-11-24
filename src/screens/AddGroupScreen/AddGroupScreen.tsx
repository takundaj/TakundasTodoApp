import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import { groupColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/navigationTypes";
import CustomButton from "../../components/CustomButtons";
import ColorRadioButtons from "../../components/ColorRadioButtons";
import styles from "./addGroupScreen.styles";

type AddGroupScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  "AddGroupScreen"
>;

const AddGroupScreen = () => {
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const colorsList = Object.values(groupColors);

  const navigation = useNavigation<AddGroupScreenNavigationProps>();

  const createNewGroup = () => {
    firestore()
      .collection("TodoGroups")
      .add({
        title: newGroupTitle,
        isDone: false,
        color: colorsList[selectedColor],
        todos: [],
      })
      .then(() => {
        console.log(`${newGroupTitle} - Group added!`);
        navigation.goBack();
      })
      .catch((error) => {
        console.log("Failed to add group - ", error);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Group</Text>
      </View>
      {/* form */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter new group name"
          style={styles.input}
          value={newGroupTitle}
          onChangeText={setNewGroupTitle}
        />
        {/* Icon Radio Buttons */}
        <ColorRadioButtons
          groupColor={colorsList}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        {/* Color Radio Buttons */}
        <CustomButton
          onPress={() => createNewGroup()}
          label={"Add group"}
          disabled={newGroupTitle.trim() === ""}
          type={"primary"}
        />

        <CustomButton
          onPress={() => navigation.goBack()}
          label={"Cancel"}
          type={"cancel"}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddGroupScreen;
