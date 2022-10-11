# Testing `.replace(multiline_string, replacerFn)` 

## Test 1: with  `(.*)`


Here, we are the follwing multiline strings passed to .replace. 


```js
let text = 
`line 0 next line is empty

line 2 next line has tab char
\t
line 4 next line has two spaces
  
line ending with newline char\n

second to last line
`
```



We're testing the regex body with or without `^` and/or/neither `$` before and after it, respectively and 
with or without either or both the `g` (global) and `m` (multiline) flags.



For the first test, the body of the regex variable `C`, which winds up being `$1`,is `(.*)` and the replacer function only returns the capture with parenthesis surrounding it.



| test# | `C = '(.*)'` | Result | `C= '([^\d]+)(\d+)([^\d]+)'` |
| -------------- | ------------------------------------------------------------ | ---- | ---- |
| 7:<br />11: | `/^C/gm`<br />`/^C$/gm` | `replacerFn` called once per line, capturing each line each time (WINNER?) |      |
| 0:<br />1:<br />3:<br />4:<br />5:<br />6:<br />9: | `/C/`<br />`/C/m`<br />`/C$/m`<br />`/^C/`<br />`/^C/m`<br />`/^C/g`<br />`/^C$/m` | `replacerFn` only called once, capturing the first line as `$1` and, in spite of only returning `($1)`,  <br />the return from `.replace` is the original string, with `()` around first line. (not useful at all) |      |
| 2:<br />14: | `/C$/`<br />`/C$/g` | `replacerFn` only called once but only captures an empty string. <br />The return from `.replace` is the original string, but with empty returned  captures placed after the original file (not useful at all) |      |
| 12:<br />13:<br />14: | `/C/g`<br />`/C/gm`<br />`/C$/gm` | `replacerFn` called once per line + 7 extraneous times interspersed between them.  The extraneous calls capture an empty string and always happens when the previous call captured content on the line (the line was not just whitespace). <br />The return from `.replace` is the original string via all the captures `($1)` and the extraneous captures are appended to the lines the occurred after. | |
| 8:<br />10: | `/^C$/`<br />`/^C$/g` | `replacerFn` never called and `.replace` just returns unchanged original string | |



Sidenote: With my unindent run on a file split by lines where `.replace` is called on each line in a loop, the following resulted in `replacerFn` to be called twice per line!?: `/(.*) /g`,  `/(.*) /gm`, `/(.*)$/g`, and `/(.*)$/gm`

## Test 2: with  `([a-z ]+)(\d+)([a-z ]+)`

For the second test, the body of the regex, 

```js
let C = String.raw`([a-z ]+)(\d+)([a-z ]+)`
```

requires there to be a number something in the middle of the line, so this should only be a match for 3 lines.

7: **`new RegExp('^'+C, 'gm')` (previously: "WINNER?")**

```js
---------- Original text:
line 0 next line is empty

line 2 next line has tab char

line 4 next line has two spaces
  
line ending with newline char


second to last line

----------
replacerFn called: p = [ 'line ', '0', ' next line is empty' ]
        returning "(line )(0)( next line is empty)"
replacerFn called: p = [ 'line ', '2', ' next line has tab char' ]
        returning "(line )(2)( next line has tab char)"
replacerFn called: p = [ 'line ', '4', ' next line has two spaces' ]
        returning "(line )(4)( next line has two spaces)"
---------- New text:
(line )(0)( next line is empty)

(line )(2)( next line has tab char)

(line )(4)( next line has two spaces)
  
line ending with newline char


second to last line

----------
```





11: **`new RegExp('^'+C+'$', 'gm')` (previously: "WINNER?")**

```js
---------- Original text:
line 0 next line is empty

line 2 next line has tab char

line 4 next line has two spaces
  
line ending with newline char


second to last line

----------
replacerFn called: p = [ 'line ', '0', ' next line is empty' ]
        returning "(line )(0)( next line is empty)"
replacerFn called: p = [ 'line ', '2', ' next line has tab char' ]
        returning "(line )(2)( next line has tab char)"
replacerFn called: p = [ 'line ', '4', ' next line has two spaces' ]
        returning "(line )(4)( next line has two spaces)"
---------- New text:
(line )(0)( next line is empty)

(line )(2)( next line has tab char)

(line )(4)( next line has two spaces)
  
line ending with newline char


second to last line

----------
```

Both outputs of our previously tied winners are the same so they are still tied. It makes sense that they are the same:

```js
/^([a-z ]+)(\d+)([a-z ]+)/gm
```

vs

```js
/^([a-z ]+)(\d+)([a-z ]+)$/gm
```

 

are the same since the final capture group `([a-z ]+)` automatically prevents the capture from gobbling up the next line because it doesn't match a portion spanning a newline so the `$` after it is not needed. 

So what's the final winner? I would say this one:

```js
/^$/gm
```

There's no harm in having  the `$` and its safer.
