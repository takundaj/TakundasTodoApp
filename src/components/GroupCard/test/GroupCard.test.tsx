import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import GroupCard from "../GroupCard";
import { useNavigation } from "@react-navigation/native";

const mockProps = {
  title: "dummyTitle",
  numberOfTodos: 5,
  groupId: "dummyId",
  groupColor: "red",
};

jest.mock("@react-navigation/core", () => ({
  ...jest.requireActual("@react-navigation/core"),
  useNavigation: jest.fn(),
}));

test("Should render GroupCard component", () => {
  const { getByTestId } = render(<GroupCard {...mockProps} />);

  const container = getByTestId("group-card-container");
  expect(container).toBeDefined();
});

test("Should match snapshot", () => {
  const tree = renderer.create(<GroupCard {...mockProps} />);
  expect(tree).toMatchSnapshot();
});
