import { render } from "@testing-library/react";
import LineWrappingInput from "../src/LineWrappingInput";

describe("ReadOnly", () => {
  it("renders the value as static text", () => {
    const value = "some static value";
    const result = render(<LineWrappingInput value={value} />);

    expect(result.findByText(value)).toBeTruthy();
  });

  describe("With suffix", () => {
    it("renders the value+suffix as static text", () => {
      const value = "some static value";
      const suffix = " and a suffix";
      const result = render(
        <LineWrappingInput value={value} suffix={suffix} />
      );

      expect(result.findByText(`${value}${suffix}`)).toBeTruthy();
    });
  });
});
