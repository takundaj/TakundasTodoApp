import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
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
  const [disabled, setDisable] = useState(false);
  const [showError, setShowError] = useState(false);
  const colorsList = Object.values(groupColors);

  const navigation = useNavigation<AddGroupScreenNavigationProps>();

  useEffect(() => {
    setDisable(newGroupTitle.trim() === "");
  }, [newGroupTitle]);

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
    <SafeAreaView style={styles.safeArea} testID="add-group-container">
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
        {showError ? (
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Oops! something went wrong.
          </Text>
        ) : null}
        {/* Icon Radio Buttons */}
        <ColorRadioButtons
          groupColors={colorsList}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        {/* Color Radio Buttons */}
        <CustomButton
          onPress={() => (disabled ? setShowError(true) : createNewGroup())}
          label={"Add group"}
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
