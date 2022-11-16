import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LineWrappingInput from "../src/LineWrappingInput";

describe("Blur on line break", () => {
  describe("when typing a line break", () => {
    it("Blurs", async () => {
      render(<LineWrappingInput blurOnLineBreak />);

      await userEvent.type(screen.getByRole("textbox"), "{Enter}");
      expect(document.activeElement).toBe(document.body);
    });
  });
});
