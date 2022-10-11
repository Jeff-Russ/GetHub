
const glob_const = "global const found"
var   glob_var   = "global var found"
let   glob_let   = "global let found"

function globFunc() {
  const s = 'in globFunc'
  try { console.log(glob_const, s) } catch(e) { console.log(e) }
  try { console.log(glob_var, s) }   catch(e) { console.log(e) }
  try { console.log(glob_let, s) }  catch(e) { console.log(e) }
  try {
    if (never_defined === undefined) console.log("can't find never_defined")
  } catch(e) {
    console.log(`if (never_defined === undefined) threw this error:`)
    console.log(e)
  }
  try {
    if (typeof never_defined) console.log("if (typeof never_defined) didn't throw error")
  } catch(e) {
    console.log(`if (never_defined === undefined) threw this error:`)
    console.log(e)
  }
  
  console.log()
  const globFunc_const = "globFunc const found"
  var   globFunc_var   = "globFunc var found"
  let   globFunc_let   = "globFunc let found"
  console.log()
  
  function globFuncFunc() {
    const s = 'in globFuncFunc'
    try { console.log(glob_const, s) } catch(e) { console.log(e) }
    try { console.log(glob_var, s) }   catch(e) { console.log(e) }
    try { console.log(glob_let, s) }  catch(e) { console.log(e) }
    console.log()
    try { console.log(globFunc_const, s) } catch(e) { console.log(e) }
    try { console.log(globFunc_var, s) }   catch(e) { console.log(e) }
    try { console.log(globFunc_let, s) }  catch(e) { console.log(e) }
    console.log()
  }
  globFuncFunc()

  const globFuncConstFunc = function() {
    const s = 'in globFuncConstFunc'
    try { console.log(glob_const, s) } catch(e) { console.log(e) }
    try { console.log(glob_var, s) }   catch(e) { console.log(e) }
    try { console.log(glob_let, s) }  catch(e) { console.log(e) }
    console.log()
    try { console.log(globFunc_const, s) } catch(e) { console.log(e) }
    try { console.log(globFunc_var, s) }   catch(e) { console.log(e) }
    try { console.log(globFunc_let, s) }  catch(e) { console.log(e) }
    console.log()
  }
  globFuncConstFunc()
  
}

globFunc()