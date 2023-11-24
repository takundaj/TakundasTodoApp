import { StyleSheet } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  swipeActionRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: size(2),
  },
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: size(4),
  },
  swipeableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: size(4),
    marginVertical: size(2),
    borderRadius: size(2),
    backgroundColor: "white",
    margin: size(4),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
