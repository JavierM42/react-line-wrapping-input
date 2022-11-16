import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LineWrappingInput from "../src/LineWrappingInput";

describe("Events", () => {
  describe("onChange", () => {
    describe("Typing normal characters", () => {
      it("Fires onChange event", async () => {
        const newValue = "some static value";
        const onChange = jest.fn();

        render(<LineWrappingInput onChange={onChange} />);

        expect(onChange).not.toHaveBeenCalled();
        await userEvent.type(screen.getByRole("textbox"), newValue);
        expect(onChange).toHaveBeenCalledTimes(newValue.length);
        expect(screen.getByDisplayValue(newValue)).toBeTruthy();
      });
    });

    describe("Typing line breaks", () => {
      it("Does not fire onChange event", async () => {
        const onChange = jest.fn();

        render(<LineWrappingInput onChange={onChange} />);

        expect(onChange).not.toHaveBeenCalled();
        await userEvent.type(screen.getByRole("textbox"), "{Enter}");
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe("Typing characters and line breaks", () => {
      it("Fires onChange only for normal characters", async () => {
        const onChange = jest.fn();

        render(<LineWrappingInput onChange={onChange} />);

        expect(onChange).not.toHaveBeenCalled();
        await userEvent.type(screen.getByRole("textbox"), "some {Enter}value");
        expect(onChange).toHaveBeenCalledTimes(10);
        expect(screen.getByDisplayValue("some value")).toBeTruthy();
      });
    });

    describe("Pasting characters and line breaks", () => {
      it("Ignores line breaks", async () => {
        const onChange = jest.fn();

        render(<LineWrappingInput onChange={onChange} />);

        expect(onChange).not.toHaveBeenCalled();
        await userEvent.click(screen.getByRole("textbox"));
        await userEvent.paste("some \nvalue");
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(screen.getByDisplayValue("some value")).toBeTruthy();
      });
    });

    describe("onReturn", () => {
      it("Fires onReturn callback on typed line breaks", async () => {
        const onReturn = jest.fn();

        render(<LineWrappingInput onReturn={onReturn} />);

        expect(onReturn).not.toHaveBeenCalled();
        await userEvent.type(screen.getByRole("textbox"), "{Enter}");
        expect(onReturn).toHaveBeenCalledTimes(1);
      });

      it("Does not fire onReturn on pasted line breaks", async () => {
        const onReturn = jest.fn();

        render(<LineWrappingInput onReturn={onReturn} />);

        expect(onReturn).not.toHaveBeenCalled();
        await userEvent.click(screen.getByRole("textbox"));
        await userEvent.paste("some \nvalue");
        expect(onReturn).not.toHaveBeenCalled();
      });
    });
  });
});
