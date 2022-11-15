# react-line-wrapping-input

`<input type="text" />` elements don't adjust to the content.

`<textarea />` elements don't either, and they allow line breaks.

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

It renders a `div` element with `display: grid` and a `textarea` child, as well as an invisible `div` on the same grid area. The invisible div renders the textarea's content, and since divs automatically resize according to their content, the textarea does as well.

This idea comes from [this CSS tricks article](https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/), with the added feature of emulating a single-line input.

## Extra features

There are a few extra features included.

### Suffix

The `suffix` optional prop renders some static text after the editable portion of the input. It can be useful for fields with units, such as "X minutes".

The suffix is rendered in a `span` tag. Use the `suffixStyle` and/or `suffixClassName` props to style it.
