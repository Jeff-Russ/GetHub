function multiplyNoOverflow() {
  let overflowing = false
  let a = 1
  for (b of arguments) {
    if (! overflowing) {
      let x = a * b;
      if (a !== 0 && x / a !== b) {
        console.log('multiplyNoOverflow() is overflowing')
        overflowing = true
        a = BigInt(a.toFixed())
      }
    }
    if (overflowing) {
      b = BigInt(b.toFixed())
    }
    a *= b
    // console.log(a)
  }
  return a
}

exports.multiplyNoOverflow = multiplyNoOverflow