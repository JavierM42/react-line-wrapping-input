import React, {
  ChangeEventHandler,
  CSSProperties,
  forwardRef,
  HTMLProps,
  useCallback,
  useEffect,
  useState,
} from "react";

type Props = Omit<HTMLProps<HTMLTextAreaElement>, "aria-multiline" | "rows"> & {
  containerClassName?: string;
  containerStyle?: Omit<CSSProperties, "display">;
  blurOnLineBreak?: boolean;
  onReturn?: ChangeEventHandler<HTMLTextAreaElement>;
  suffix?: string;
  suffixClassName?: string;
  suffixStyle?: CSSProperties;
};

const LineWrappingInput = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      containerClassName,
      containerStyle = {},
      suffix = " ",
      suffixClassName,
      suffixStyle,
      blurOnLineBreak,
      onReturn,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(props.value);
    useEffect(() => setValue(props.value), [props.value]);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
      (event) => {
        const newValue = event.target.value.replace(/\r|\n/g, "");
        // Override user typing line breaks. Doesn't fire if the line break was pasted, that's handled by the else block.
        if ((event.nativeEvent as InputEvent).inputType === "insertLineBreak") {
          if (blurOnLineBreak) {
            event.target.blur();
          }
          onReturn?.({
            ...event,
            target: {
              ...event.target,
              value: newValue,
            } as any,
          });
        } else {
          // Strip line breaks (from pasted text or any other reason)
          props.onChange?.({
            ...event,
            target: {
              ...event.target,
              value: newValue,
            } as any,
          });
          setValue(newValue);
        }
      },
      [props.onChange, setValue]
    );

    return (
      <div
        className={`line-wrapping-input-container ${containerClassName || ""}`}
        style={{ ...containerStyle, display: "grid" }}
      >
        <textarea
          {...props}
          className={`line-wrapping-input ${props.className || ""}`}
          value={value}
          aria-multiline="false"
          style={{
            border: "1px solid black",
            padding: "2px",
            font: "inherit",
            ...(props.style || {}),
            gridArea: "1 / 1 / 2 / 2",
            resize: "none",
            overflow: "clip",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
          onChange={handleChange}
          rows={1}
          ref={ref}
        />
        <div
          className={`line-wrapping-input ${props.className || ""}`}
          style={{
            border: "1px solid black",
            padding: "2px",
            font: "inherit",
            ...(props.style || {}),
            gridArea: "1 / 1 / 2 / 2",
            whiteSpace: "pre-wrap",
            overflow: "clip",
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
  }
);

export default LineWrappingInput;
