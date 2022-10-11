# IMPORTANT ANNOUNCMENTS

## Assembling RegExp from strings

Problem:

==IF YOU PASS A STRING TO==
`new RegExp`, like `"([a-z\s]+)(\d+)([a-z\s]+)"`, 
==then you  will  get `\([a-zs]+)(\d+)([a-zs]+)\`.==
That's right, ==YOU LOOSE THE BACK SLASHES==.

Solution: [String.raw() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw) 

The static **`String.raw()`** method is a tag function of [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). This is similar to the `r` prefix in Python, or the `@` prefix in C# for string literals. It's used to get the raw string form of template literals — that is, substitutions (e.g. `${foo}`) are processed, but escape sequences (e.g. `\n`) are not.

```js
let re_str = String.raw`([a-z\s]+)(\d+)([a-z\s]+)`
let re1 = new RegExp(re_str)
// or just 
let re2 = new RegExp(String.raw`([a-z\s]+)(\d+)([a-z\s]+)`)
```

Note that this doesn't work

```js
> let re_str = String.raw'([a-z\s]+)(\d+)([a-z\s]+)'
let re_str = String.raw'([a-z\s]+)(\d+)([a-z\s]+)'
                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^
Uncaught SyntaxError: Unexpected string
> 
> let re_str = String.raw"([a-z\s]+)(\d+)([a-z\s]+)"
let re_str = String.raw"([a-z\s]+)(\d+)([a-z\s]+)"
                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^
Uncaught SyntaxError: Unexpected string
> 
```

