const {heredoc} = require('./heredoc.js')

const multiline_with_special_chars = 
`line 0 (next line is empty)

line 2 (next line has tab char)
\t
line 4 (next line has two spaces)
  
line ending with newline char\n

second to last line
`

const multiline_without_special_chars = 
`line 0 (next line is empty)

line 2 (next line has real tab)
	
line 4 (next line has two spaces)
  
line ending with real newline


second to last line
`

console.log(`"${multiline_with_special_chars}"`)

console.log(`"${multiline_without_special_chars}"`)


const text = `a very long string that just continues\
 and continues and continues`;

console.log(`"${text}"`)


function testDedent() {
  const multiline_without_special_chars = dedent(
    `line 0: no indent
      line 1: two spaces of indent
    	line 2 tabbed in with real tab
    line 3 (next line is blank)

    second to last line (next line is blank)
    `)
  console.log(multiline_without_special_chars)
}

testDedent()