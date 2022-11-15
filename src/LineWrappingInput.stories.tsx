import LineWrappingInput from "./LineWrappingInput";

export const Story = () => (
  <LineWrappingInput
    placeholder="Some amount of"
    suffix=" minutes"
    containerStyle={{
      border: "1px solid black",
    }}
    style={{
      padding: "2px",
    }}
  />
);
