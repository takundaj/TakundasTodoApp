import { StyleSheet } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(189, 195, 199, 0.7)",
  },
  innerContanier: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: size(4),
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    opacity: 1,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "turquoise",
  },
  inputContainer: {
    paddingVertical: size(2),
    paddingHorizontal: size(4),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: "white",
    borderRadius: 50,
    marginVertical: size(4),
  },
});
