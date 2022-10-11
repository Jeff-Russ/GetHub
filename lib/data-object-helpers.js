function commonElementsCount(arr1, arr2) {
  return arr1.filter( el => arr2.indexOf(el) >= 0).length
}

exports.commonElementsCount = commonElementsCount