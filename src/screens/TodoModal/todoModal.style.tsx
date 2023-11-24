import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(189, 195, 199, 0.7)",
  },
  header: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 16,
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    opacity: 1,
  },
  headerText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "turquoise",
  },
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: "white",
    borderRadius: 50,
    marginVertical: 16,
    marginBottom: 40,
  },
});
