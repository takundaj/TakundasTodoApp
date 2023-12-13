import { StyleSheet } from "react-native";
import { size } from "../../utils/helpers";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: size(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: size(8),
    fontWeight: "bold",
  },
  profileImage: { height: 50, width: 50, borderRadius: 25 },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: size(2),
  },
  addGroupButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "turquoise",
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
});
