import { View, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./colorRadioButtons.styles";

type Props = {
  groupColors: string[];
  selectedColor: number;
  setSelectedColor: React.Dispatch<React.SetStateAction<number>>;
};

const ColorRadioButtons = ({
  groupColors,
  selectedColor,
  setSelectedColor,
}: Props) => {
  return (
    <View style={styles.container} testID="buttons-container">
      {groupColors.map((color, index) => (
        <TouchableOpacity
          key={index}
          testID="button"
          style={[
            styles.colorContainer,
            {
              backgroundColor: color,
              borderWidth: selectedColor === index ? 5 : 0,
              borderColor: selectedColor === index ? "turquoise" : "black",
            },
          ]}
          onPress={() => setSelectedColor(index)}
        ></TouchableOpacity>
      ))}
    </View>
  );
};

export default ColorRadioButtons;
