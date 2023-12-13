import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import ColorRadioButtons from "../ColorRadioButtons";
import { groupColors } from "../../../constants/colors";

const mockProps = {
  groupColors: Object.values(groupColors),
  selectedColor: 0,
  setSelectedColor: jest.fn(),
};

test("Should render ColorRadioButtons component", () => {
  const { getByTestId } = render(<ColorRadioButtons {...mockProps} />);

  const buttonsContainer = getByTestId("buttons-container");

  expect(buttonsContainer).toBeDefined;
});

test("Should render the correct amount of buttons", () => {
  const { getAllByTestId } = render(<ColorRadioButtons {...mockProps} />);

  const buttons = getAllByTestId("button");

  expect(buttons.length).toEqual(mockProps.groupColors.length);
});

test("Selected color should change when button is pressed", () => {
  const { getAllByTestId } = render(<ColorRadioButtons {...mockProps} />);

  const buttons = getAllByTestId("button");

  fireEvent.press(buttons[0]);

  expect(mockProps.setSelectedColor).toHaveBeenCalled();
});

test("Selected color should change when button is pressed", () => {
  const tree = renderer.create(<ColorRadioButtons {...mockProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
