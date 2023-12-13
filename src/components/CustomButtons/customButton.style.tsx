import { StyleSheet } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  container: {
    padding: size(3),
    borderRadius: 50,
    alignItems: "center",
    marginBottom: size(4),
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  text: { color: "white", fontWeight: "bold" },
});
