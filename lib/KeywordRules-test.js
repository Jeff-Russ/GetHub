const { KeywordRules } = require('./KeywordRules.js');

function keywordRulesTest() {
  let arr = [
    { index: 0, about: {keywords: [ 'CSS', 'HTML', 'JavaScript', 'Next.js', 'Python', '.Net' ]} },
    { index: 1, about: {keywords: [ 'Java', 'HTML', 'JavaScript', 'Next.js', 'Python', '.Net' ]} },
    { index: 2, about: {keywords: [ 'Java', 'HTML', 'JavaScript', 'Next.js', 'Python' ]} },
    { index: 3, about: {keywords: [ 'Java', 'HTML', 'JavaScript', 'Next.js' ]} },
    { index: 4, about: {keywords: [ 'Java', 'CSS', 'HTML', 'JavaScript', 'Python', '.Net' ]} },
    { index: 5, about: {keywords: [ 'Java', 'CSS', 'HTML', 'Python', '.Net' ]} },
  ]

  // console.log(KeywordRules.scanForKeywords(arr))

  let obj = {
    zero: { index: 0, about: {keywords: [ 'CSS', 'HTML', 'JavaScript', 'Next.js', 'Python', '.Net' ]} },
    one:  { index: 1, about: {keywords: [ 'Java', 'HTML', 'JavaScript', 'Next.js', 'Python', '.Net' ]} },
    two:  { index: 2, about: {keywords: [ 'Java', 'HTML', 'JavaScript', 'Next.js', 'Python' ]} },
    three:{ index: 3, about: {keywords: [ 'Java', 'HTML', 'JavaScript', 'Next.js' ]} },
    four: { index: 4, about: {keywords: [ 'Java', 'CSS', 'HTML', 'JavaScript', 'Python', '.Net' ]} },
    five: { index: 5, about: {keywords: [ 'Java', 'CSS', 'HTML', 'Python', '.Net' ]} },
  }

  const keywordsAccessor = ".about.keywords"


  console.log(KeywordRules.scanForKeywords(obj, keywordsAccessor))

  let keywords = ['Java', 'CSS', 'HTML', 'JavaScript', 'Next.js', 'Python', '.Net']
  const rules = new KeywordRules()
  rules.mustHave('two', ['HTML', 'JavaScript', "CSS"], 1)
  rules.mustHave('one', ['Next.js', "Python"], 2)
  rules.setPriority(['.Net'], 0.5)
  rules.setPriority(['Python'], 1.1)
  rules.setPriority(['Java'], 0.9)
  keywords = rules.getKeywordsLackingRules(keywords)

  if (keywords.length === 0) {
    const {keywords, must_have} = rules.getRules()
    console.log(keywords)
    console.log(must_have)

    console.log('assignRankForEach(arr) test:')
    rules.assignRankForEach(arr, ".about.keywords")
    console.log(arr)

    console.log('assignRankForEach(obj) test:')
    rules.assignRankForEach(obj, ".about.keywords")
    console.log(obj)

  } else {
    console.log(`lacking rules: ${keywords}`)
  }
}

keywordRulesTest()






// console.log(arr[0]['keywords'])

// assignRankForEachTest(arr, `.about['keywords']`)