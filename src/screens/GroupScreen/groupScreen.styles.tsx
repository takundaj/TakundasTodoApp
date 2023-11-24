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
});
