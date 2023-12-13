import { StyleSheet } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: size(4),
    marginBottom: size(4),
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  colorContainer: {
    height: size(8),
    width: size(8),
    borderRadius: 50,
  },
});
