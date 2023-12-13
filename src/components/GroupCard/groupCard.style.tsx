import { StyleSheet, Dimensions } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width / 2.6,
    height: 150,
    padding: size(4),
    margin: size(4),
    borderRadius: size(2),
    backgroundColor: "white",
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  innerContainer: {
    flex: 1,
    borderLeftWidth: size(1),
    paddingHorizontal: size(4),
    paddingBottom: size(2),
    justifyContent: "space-between",
  },
  groupTitle: {
    fontSize: size(4),
    marginBottom: size(1),
  },
  todoCount: {
    color: "grey",
  },
  addGroupContainer: {
    width: 150,
    height: 150,
    padding: size(4),
    margin: size(4),
    borderWidth: 1,
    borderRadius: size(2),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
