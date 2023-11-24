import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./customButton.style";

type Props = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  type: "primary" | "cancel";
};

const CustomButton: React.FC<Props> = ({ label, onPress, disabled, type }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: type == "primary" ? "turquoise" : "grey" },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
