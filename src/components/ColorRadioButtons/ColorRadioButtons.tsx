import { View, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./colorRadioButtons.styles";

type Props = {
  groupColor: string[];
  selectedColor: number;
  setSelectedColor: React.Dispatch<React.SetStateAction<number>>;
};

const ColorRadioButtons = ({
  groupColor,
  selectedColor,
  setSelectedColor,
}: Props) => {
  return (
    <View style={styles.container}>
      {groupColor.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.colorContainer,
            {
              backgroundColor: color,
              borderWidth: selectedColor === index ? 5 : 1,
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
