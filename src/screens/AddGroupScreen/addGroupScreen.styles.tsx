import { StyleSheet } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: size(6),
  },
  headerText: { fontSize: size(6), fontWeight: "bold" },
  inputContainer: { marginHorizontal: size(4) },
  input: {
    padding: size(4),
    marginBottom: size(4),
    borderRadius: 50,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
