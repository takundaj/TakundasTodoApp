import { View, Text, Dimensions, Button, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/navigationTypes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { groupColors } from "../../constants/colors";
import CustomButton from "../../components/CustomButtons";
import ColorRadioButtons from "../../components/ColorRadioButtons";
import styles from "./groupModal.style";

type Props = {};

type GroupModalNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "GroupModal"
>;

type GroupModalRouteProp = RouteProp<StackParamList, "GroupModal">;

const GroupModal = () => {
  const colors = Object.values(groupColors);
  const navigation = useNavigation<GroupModalNavigationProp>();
  const route = useRoute<GroupModalRouteProp>();
  const [inputValue, setInputValue] = useState(route.params.groupTitle);
  const [selectedColor, setSelectedColor] = useState(
    route?.params?.groupColor ? colors.indexOf(route?.params?.groupColor) : 0
  );

  const updateGroup = () => {
    if (inputValue?.trim() !== "") {
      firestore()
        .collection("TodoGroups")
        .doc(route.params.groupId)
        .update({
          title: inputValue,
          color: colors[selectedColor],
        })
        .then(() => {
          console.log(`${inputValue} - Group updated!`);
          navigation.goBack();
        })
        .catch((error) => {
          console.log("Failed to add group - ", error);
        });
    }
  };

  const deleteGroup = () => {
    firestore()
      .collection("TodoGroups")
      .doc(route.params.groupId)
      .delete()
      .then(() => {
        console.log(`${route.params.groupTitle} - has been deleted!`);
        navigation.goBack();
      })
      .catch((error) => console.log("Failed to delete todo - ", error));
  };

  const triggerAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this group?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteGroup(),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container} testID="group-modal-container">
      <View
        style={[
          styles.innerContanier,
          { height: Dimensions.get("screen").height / 2.2 },
        ]}
      >
        <Text style={styles.title}>Edit Group</Text>
        <View style={styles.inputContainer}>
          <TextInput value={inputValue} onChangeText={setInputValue} />
        </View>
        <ColorRadioButtons
          groupColors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <CustomButton
          label={"Save Changes"}
          onPress={() => updateGroup()}
          type="primary"
        />
        <CustomButton
          label={"Cancel"}
          onPress={() => navigation.goBack()}
          type="cancel"
        />
        <Button
          title="Delete group"
          color={"red"}
          onPress={triggerAlert}
        ></Button>
      </View>
    </View>
  );
};

export default GroupModal;
