import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import TodoItem from "../TodoItem";

const mockProps = {
  title: "dummyTitle",
  groupId: "dummyId",
  isChecked: false,
  onCompleteTodo: jest.fn(),
  todos: [{ title: "dummyTitle", createdAt: "", isDone: false }],
  deleteTodo: jest.fn(),
  color: "red",
};

jest.mock("@react-navigation/core", () => ({
  ...jest.requireActual("@react-navigation/core"),
  useNavigation: jest.fn(),
}));

test("Should render GroupCard component", () => {
  const { getByTestId } = render(<TodoItem {...mockProps} />);

  const container = getByTestId("todo-item-container");
  expect(container).toBeDefined();
});

test("Should call onCompleteTodo after icon press", () => {
  const { getByTestId } = render(<TodoItem {...mockProps} />);

  const icon = getByTestId("todo-item-icon");
  fireEvent.press(icon);
  expect(mockProps.onCompleteTodo).toHaveBeenCalled();
});

test("Should match snapshot", () => {
  const tree = renderer.create(<TodoItem {...mockProps} />);
  expect(tree).toMatchSnapshot();
});
