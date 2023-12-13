import { StyleSheet } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: size(6),
  },
  title: { fontSize: size(6), fontWeight: "bold" },
  progressText: { fontSize: size(6) },
  noTodosContainer: { alignItems: "center", flexGrow: 1 },
  noTodosText: {
    color: "grey",
  },
  list: { flexGrow: 1 },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: size(4),
    marginHorizontal: size(4),
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  input: { flexDirection: "row", flex: 1 },
  submit: {
    padding: size(3),
    borderRadius: 50,
    margin: size(1),
  },
  submitText: { color: "white", fontWeight: "bold" },
});
