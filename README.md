# react-line-wrapping-input

`<input type="text" />` elements don't wrap.

`<textarea />` elements don't adjust to the content, and they allow line breaks.

Sometimes, you need an input that wraps when the content is too long.

Sometimes, you need an input that wraps when the content is too long, but doesn't allow manual line breaks.

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
  {/* no required props */}
  {/* you'll most likely need these for controlled inputs. You can also use onBlur and any other textarea props */}
  value={...}
  onChange={...}
  {/* optional custom props, see below */}
/>
```

## How it works

It renders a `div` element with `display: grid` and a `textarea` child, as well as another `div` that overlaps it. This `div` renders the textarea's content too (but invisible!), and since divs automatically resize according to their content, the textarea does as well.

This idea comes from [this CSS tricks article](https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/), with the added feature of emulating a single-line input by stripping line breaks.

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

> A way to style only the textarea or the invisible element is not provided because if they don't have matching styles the autosizing would break.

## Extras

There are a few extra features that you can take advantage of on the line-wrapping input.

### blurOnLineBreak

The `blurOnLineBreak` boolean prop will blur the input when the user presses the `return` key. Otherwise, the return key will move the cursor to the end of the content.

> On regular HTML text inputs, the return key doesn't behave like this, but I've found no way to prevent it.

### onReturn

If you want to do anything else when the user presses the return key (for example, persisting the data), use the `onReturn` prop.

### suffix

The `suffix` optional prop renders some static text after the editable portion of the input. It can be useful for fields with units, such as "X minutes".

The suffix is rendered in a `span` tag. Use the `suffixStyle` and/or `suffixClassName` props to style it if you need to.

### readOnly

In addition to `disabled` support, a `readOnly` boolean prop is included. This will unmount the textarea and show the static content instead. It can be useful when a disabled field is not desirable or if distinct _read-only_ and _disabled_ states are required.

### ref

The `ref` to the textarea element is exposed via forwardRef. Use it only if you know what you're doing.

## Limitations and workarounds

### Maximum rows

There's no way to set the maximum amount of rows for the input. If you need the input not to expand past a certain point, set `max-height` (and most likely `overflow: auto`) on the container element (with the `.line-wrapping-input-container` selector, the `containerClassName` prop or the `containerStyle` prop).

### Arbitrarily long words

The input will resize horizontally when a word is longer than the width. I haven't found any workarounds that don't break other features.
