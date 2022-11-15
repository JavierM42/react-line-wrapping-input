# react-line-wrapping-input

`<input type="text">` elements don't wrap nor adjust their size to the content.

`<textarea>` elements wrap, but don't adjust their size to the content, and they allow line breaks.

Sometimes, you need an input that wraps when the content is too long, but you don't want line breaks.

This package solves that problem, and does it based on a `textarea` element. No need to mess around with `contenteditable`.

<!-- TODO [Live demo](codesandbox URL) -->

## Installation

```
npm install --save react-line-wrapping-input
```

## Usage

```js
import LineWrappingInput from "react-line-wrapping-input";
```

```js
<LineWrappingInput
  {/*
    No required props.
    You'll probably want value and onChange for controlled inputs.
    You can also use onBlur and any other textarea props.
    There are some custom props too, see below.
  */}
/>
```

## How it works

It renders a `div` element with `display: grid` and a `textarea` child, as well as another `div` that overlaps it. This `div` renders the textarea's content too (but invisible!), and since divs automatically resize according to their content, the textarea does as well.

This solution is inspired by [this CSS tricks article](https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/), with the added feature of emulating a single-line input by stripping line breaks.

## Styling

You can add CSS rules to the built-in classes, supply your own, or use inline styles.

### Built-in classes:

- Use the `.line-wrapping-input-container` selector to style the container.
- Use the `.line-wrapping-input` selecctor to style the textarea and the invisible element.

### Supplying your own classes:

- Use the `containerClassName` prop to add classes to the container.
- Use the `className` prop to add classes to the textarea and the invisible element.

### Inline styles:

- Use the `containerStyle` prop to add styles to the container. _`display: grid` cannot be overridden_
- Use the `style` prop to add styles to the textarea and the invisible element. _`grid-area`, `resize`, `white-space` and `overflow-wrap` cannot be overridden._

> A way to style only the textarea or the invisible element is not provided. The autosizing would break if they don't have matching styles.

## Extras

There are a few extra features that you can take advantage of.

### blurOnLineBreak

The `blurOnLineBreak` boolean prop will blur the input when the user presses the `return` key. Otherwise, the return key will move the cursor to the end of the content.

> On regular HTML text inputs, the return key doesn't behave like this, but I've found no way to prevent it.

### onReturn

If you want to do anything else when the user presses the return key (for example, submitting data), use the `onReturn` prop.

### suffix

The `suffix` optional prop renders some static text after the editable portion of the input. It can be useful for fields with units, such as "\_\_\_ minutes".

The suffix is rendered in a `span` tag. Use the `suffixStyle` and/or `suffixClassName` props to style it if you need to.

### readOnly

In addition to the standard `disabled` prop, a `readOnly` boolean prop is included. This will unmount the textarea and show the static content instead. It can be useful when a disabled field is not desirable or if distinct _read-only_ and _disabled_ states are required.

### ref

The `ref` to the textarea element is exposed via `forwardRef`, if you need to access it for some reason.

### Growing the field horizontally

If you set `width: fit-content` to the container element (`.line-wrapping-input-container`), you'll get an input that expands horizontally up to its `max-width` (if one is set) and then wraps to the next line.

## Limitations and workarounds

### Arbitrarily long words

The input will resize horizontally when a word is longer than its width. I haven't found any solutions for this problem that don't break other features.

### text-align and suffix

The `suffix` prop will not display correctly when using `text-align: center` or `text-align: right`.

### Maximum rows

There's no way to set the maximum amount of rows for the input. If you need the input not to expand past a certain point, set `max-height` (and most likely `overflow: auto`) on the container element (using the `.line-wrapping-input-container` selector, the `containerClassName` prop or the `containerStyle` prop).

If you do, my recommendation is to add any desired padding to the input and any desired borders to the container, that way the scrolling behavior will look better.

> Some help with the math:

> If you're using absolute values for all of these values including `line-height`: `max-height: PADDING_TOP + PADDING_BOTTOM + BORDER_TOP + BORDER_BOTTOM + DESIRED_MAX_LINES * LINE_HEIGHT` will do the trick (replace with your actual values).

> If you're using a relative value for line height, you can use `calc([SUM_OF_VERTICAL_PADDINGS_AND_BORDERS]px + [DESIRED_MAX_LINES * LINE_HEIGHT * FONT_SIZE]em)`
