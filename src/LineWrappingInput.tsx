import React, {
  ChangeEventHandler,
  CSSProperties,
  FC,
  HTMLProps,
  useCallback,
  useEffect,
  useState,
} from "react";

type Props = Omit<HTMLProps<HTMLTextAreaElement>, "aria-multiline" | "rows"> & {
  suffix?: string;
  suffixClassName?: string;
  suffixStyle?: CSSProperties;
};

const LineWrappingInput: FC<Props> = ({
  suffix = " ",
  suffixClassName,
  suffixStyle,
  ...props
}) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => setValue(props.value), [props.value]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      // Override user typing line breaks. Doesn't fire if the line break was pasted, that's handled by the else block.
      if ((event.nativeEvent as InputEvent).inputType === "insertLineBreak") {
        //   event.target.blur();
      } else {
        // Strip line breaks (from pasted text or any other reason)
        const newValue = event.target.value.replace(/\r|\n/g, "");
        props.onChange?.({
          ...event,
          target: {
            ...event.target,
            value: newValue,
          } as EventTarget,
        });
        setValue(newValue);
      }
    },
    [props.onChange, setValue]
  );

  return (
    <div style={{ display: "grid" }}>
      <textarea
        {...props}
        value={value}
        aria-multiline="false"
        style={{
          border: "1px solid black",
          padding: "2px",
          font: "inherit",
          ...props.style,
          gridArea: "1 / 1 / 2 / 2",
          resize: "none",
          overflow: "clip",
          overflowWrap: "break-word",
        }}
        onChange={handleChange}
        rows={1}
      />
      <div
        style={{
          gridArea: "1 / 1 / 2 / 2",
          // textarea style
          border: "1px solid black",
          padding: "2px",
          font: "inherit",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          pointerEvents: "none",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            visibility: "hidden",
          }}
        >
          {value || props.placeholder}
        </span>
        <span className={suffixClassName} style={suffixStyle}>
          {suffix}
        </span>
      </div>
    </div>
  );
};

export default LineWrappingInput;
