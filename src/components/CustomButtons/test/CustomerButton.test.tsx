import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import CustomButton from "../CustomButton";

const mockProps = {
  label: "hello",
  onPress: jest.fn(),
  disabled: false,
};

test("Should render CustomButton component", () => {
  const { getByTestId } = render(
    <CustomButton {...mockProps} type="primary" />
  );

  const customButton = getByTestId("custom-button");

  expect(customButton).toBeDefined();
});

test("Should run onPress when button is pressed", () => {
  const { getByTestId } = render(
    <CustomButton {...mockProps} type="primary" />
  );

  const customButton = getByTestId("custom-button");

  fireEvent.press(customButton);

  expect(mockProps.onPress).toHaveBeenCalledWith();
});

test("Should match snapshot", () => {
  const tree = renderer.create(<CustomButton {...mockProps} type="primary" />);

  expect(tree).toMatchSnapshot();
});
