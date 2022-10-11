const { multiplyNoOverflow } = require('./math-helpers.js');


class KeywordRules {

  //////////// static properties  ///////////////////////////////////////////////////////

  static scanForKeywords(obj, keywordsAccessor) {
    /**
     * scanForKeywords(obj[, keywordsAccessor]) returns all keywords
     * found in object using keywordsAccessor
     * Usage: call after constructing KeywordRules to be sure all keywords
     * are know before assigning rules to them.
     * 
     * for info on keywordsAccessor, see comments for the static method
     * resolveKeywordsAccessor(keywordsAccessor)
     */
    keywordsAccessor = this.resolveKeywordsAccessor(keywordsAccessor)
    let keywords = []
    for (const key in obj) {
      keywords = [...keywords, ...keywordsAccessor(obj, key)]
    }
    return [...new Set([...keywords])]
  }

  static resolveKeywordsAccessor(keywordsAccessor) {
    /**
    * if keywordsAccessor is callable:
    *  it is called for each key in obj with keywordsAccessor(obj, key) 
    *  and should return an array of keywords for obj[key]
    * if keywordsAccessor is a string:
    *  it be a string of what appears after obj[key] to access an array
    *  of keywords. for example if keywordsAccessor = `.about['keywords']`
    *  then obj.about['keywords'] should return an array of keywords
    * if keywordsAccessor is not provided:
    *  each obj[key] must be an array of keywords
    * prop_chain_string is the path through object to the array of keywords
    */
    if (typeof keywordsAccessor === 'string') {
      return (obj, key) => eval(`obj[\"${key}\"]${keywordsAccessor}`)
    }
    else if (typeof keywordsAccessor === 'undefined') {
      return (obj, key) => obj[key]
    }
    else return keywordsAccessor
  }


  //////////// object properties  ///////////////////////////////////////////////////////


  /* MY NOTES:
  I'm pretty sure whenever the user adds a keyword to this.must_have.all, it also results in 
  this.keywords[keyword].required = true... I hope so at least. I don't think if made any public
  way for the user to set this.keywords[keyword].required directly and I don't think I want that
  since I assignRankForEach and fail entries based on lacking any keyword in this.must_have.all
  rather than not finding a keyword for which this.keywords[keyword].required is true.
  So I don't think I neeed this.keywords[keyword].required, just this.keywords[keyword].priority.
  I guess it's useful to have if you are interating each this.keywords to see which ones are required
  but one could just iterate this.must_have.all instead. 
  
    So maybe get rid of this.keywords[keyword].required?

  */

  constructor(rules) {
    if (typeof rules === 'object') {
      this.keywords = 'keywords' in rules ? rules.keywords : {}
      this.must_have = 'must_have' in rules ? rules.must_have : {none: [], all: []}
    } else {
      this.keywords = {} // each this.keywords[keyword] = {priority: float, required: bool}
      this.must_have = {
        none: [],  // keywords with priority 0 are added here (not allowed in results of filter/sort)
        all:  [] // any keyword here are this.keywords[keyword].required = true
      } // each this.must_have[int>=0 or 'all'] = [...keywords]
    }
  }


  /**** object methods that determine if rules are set for keywords **********/

  getKeywordsLackingRules() {
    /**
     * keywordRulesAreSet returns all keywords in argument(s) for which sufficient rules
     * have not been set. Usage: call until return is empty and with each loop that 
     * return is not empty, present the user with the returned keywords and 
     * prompt them with option on what rules to set for them.
     * 
     * keywordRulesAreSet can be called before other methods to prevent clashing rules
     * Usage: keep passing
     * Can be called with variable number of args, each a keyword or with an array
     * 
     */
    if (arguments.length === 0)
      throw new Error(`keywordRulesAreSet() must be called with one or more strings or an array of strings`)
    let keywords
    if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        return (keyword in this.keywords) ? [] : [keyword]
      } else {
        keywords = arguments[0]
      }
    } else {
      keywords = arguments
    }
    const lacking_rules = []
    for (const keyword of keywords) {
      if (! (keyword in this.keywords)) {
        lacking_rules.push(keyword)
      }
    }
    return lacking_rules
  }


  /************ object methods that set rules for keywords *******************/

  setPriority(keywords, priority) {
    if (typeof keywords === 'string') {
      keywords = [keywords]
    }

    const temp = {keywords: {}, must_have: { none: []}}
    keywords.forEach(k => {
      if (! (k in this.keywords)) {
        temp.keywords[k] = {priority, required: undefined}
      }
      else {
        if (priority === 0 && this.keywords[k].required === true) {
          throw new Error(`Priority of ${k} cannot be set to 0 because it is required`)
        }
        temp.keywords[k] = {priority, required: this.keywords[k].required}
      }
    })
    this.keywords = {...this.keywords, ...temp.keywords} 

    return this
  }

  mustHave(how_many, keywords, priority) {
    // setter/getter for any rule in this.must_have
    if (arguments.length === 0) return this.must_have

    how_many = `${how_many}`.toLowerCase()

    // prettier-ignore
    const numbers = {
      '0.0': 'none', zero: 'none', none: 'none', 
      '1.0': 1, one: 1,
      '2.0': 2, two: 2,
      '3.0': 3, three: 3, 
      '4.0': 4, four: 4, 
      '5.0': 5, five: 5, 
      '6.0': 6, six: 6, 
      '7.0': 7, seven: 7, 
      '8.0': 8, eight: 8, 
      '9.0': 9, nine: 9, 
      'all': 'all'
    }

    if (how_many in numbers) {
      how_many = numbers[how_many]
    }
    if (arguments.length === 1) {
      return how_many in this.must_have ? this.must_have.how_many : []
    }


    if (how_many === 'none') {
      if (typeof priority !== 'undefined' || priority !== 0) {
        throw new Error(`mustHave('none' priority=${priority}) is invalid: priority will be 0`)
      }
      return this.mustHaveNone(keywords)
    }

    if (how_many !== 'all') {
      let total_keywords = keywords.length
      if (how_many in this.must_have) {
        total_keywords += this.must_have[how_many].length
      }
      if (how_many === total_keywords) {
        console.warn(this._how_many_conversionMessage('mustHave', how_many, keywords, priority))
        how_many = 'all'
      }
      else if (how_many > total_keywords) {
        throw new Error(`cannot require ${how_many} of ${total_keywords} keywords`)
      }
    }


    if (how_many === 'all') {
      if (typeof priority === 'undefined') {
        priority = 1.0 
      } else if (priority <= 0) {
        throw new Error(`mustHave('all' priority=${priority}) is invalid: priority must be non-zero and positive`)
      }
      return this.mustHaveAll(keywords, priority)
    }


    /// We write to temp rather than directly  to this 
    // to prevent clashing rules for an already assigned keywords. 
    // If no clashes (exceptions throw), we'll commit to this
    const temp = {keywords: {}, must_have: { [how_many]: []}} 

    keywords.forEach(k => {
      if (! (k in this.keywords)) {
        priority ??= 1.0
        temp.keywords[k] = {priority, required: undefined}
      }
      else {
        if (this.keywords[k].priority <= 0) { 
          throw new Error(this._priorityErrorMessage(`mustHave[${how_many}]`, k, this.keywords[k].priority))
        }
        priority ??= this.keywords[k].priority
        temp.keywords[k] = {priority, required: this.keywords[k].required}

      }
      for (const num in this.must_have) {
        if (num === 'none' || num === 'all') {
          if (k in this.must_have[num]) {
            throw new Error(this._presenceInErrorMessage(`mustHave[${how_many}]`, k, `must_have.${num}`))
          }
        }
      }
      temp.must_have[how_many].push(k) // commit to temp first then...
    })
    // no errors so we commit all changes to this

    this.keywords = {...this.keywords, ...temp.keywords} 
    if (how_many in this.must_have) {
      this.must_have[how_many] = [...new Set([...this.must_have[how_many], ...temp.must_have[how_many]])]
    } else {
      this.must_have[how_many] = [...new Set([...temp.must_have[how_many]])]
    }

    return this
  }
  
  mustHaveAll(keywords, priority=1.0) { 
    // setter/getter for this.must_have.all
    if (arguments.length === 0) return this.must_have.all

    // We write to temp rather than directly  to this 
    // to prevent clashing rules for an already assigned keywords. 
    // If no clashes (exceptions throw), we'll commit to this
    const temp = {keywords: {}, must_have: { all: []}} 

    keywords.forEach(k => {
      if (! (k in this.keywords)) {
        temp.keywords[k] = {priority, required: true}
      }
      else {
        if (this.keywords[k].priority <= 0) {
          throw new Error(this._priorityErrorMessage('mustHave[all]', k, this.keywords[k].priority))
        }
        priority ??= this.keywords[k].priority
        temp.keywords[k] = {priority, required: true}
      }
      for (const num in this.must_have) {
        if (num !== "all" && k in this.must_have[num])  {
          throw new Error(this._presenceInErrorMessage('mustHave[all]', k, `must_have.${num}`))
        }
      }

      temp.must_have.all.push(k) // commit to temp first then...
    })
    // no errors so we commit all changes to this
    this.keywords = {...this.keywords, ...temp.keywords} 
    this.must_have.all = [...new Set([...this.must_have.all, ...temp.must_have.all])]

    return this
  }

  mustHaveNone(keywords) {
    // setter/getter for this.must_have.none
    if (arguments.length === 0) return this.must_have.none

    // We write to temp rather than directly  to this 
    // to prevent clashing rules for an already assigned keywords. 
    // If no clashes (exceptions throw), we'll commit to this
    const temp = {keywords: {}, must_have: { none: []}} 

    keywords.forEach(k => {
      if (! (k in this.keywords)) { 
        temp.keywords[k] = {priority: 0.0, required: false}
      }
      else {
        if (this.keywords[k].priority > 0) {
          throw new Error(this._priorityErrorMessage('mustHave[none]', k, this.keywords[k].priority))
        }
        if (this.keywords[k].required === true) {
          throw new Error(this._requiredErrorMessage('mustHave[none]', k, this.keywords[k].required))
        }
        temp.keywords[k] = {priority: this.keywords[k].priority, required: false}
      }
      for (const num in this.must_have) {
        if (num !== "none" && k in this.must_have[num])  {
          throw new Error(this._presenceInErrorMessage('mustHave[none]', k, `must_have.${num}`))
        }
      }

      temp.must_have.none.push(k) // commit to temp first then...
    })
    // no errors so we commit all changes to this
    this.keywords = {...this.keywords, ...temp.keywords} 
    this.must_have.none = [...new Set([...this.must_have.none, ...temp.must_have.none])]

    return this
  }

  /************ object methods that get rules for keyword(s) *****************/

  getRules() {
    return {keywords: this.keywords, must_have: this.must_have}
  }

  getKeywordRule(keyword) {
    if (keyword in this.keywords) return this.keywords[keyword]
    // else undefined is returned, so wrap getKeywordRule calls in try block
  }


  /****** object methods that rank, filter or sort based on rules  ***********/

  getRankForKeywords(keywords, missing_keywords=[]) {

    for (const how_many_str in this.must_have) {
      // for each must_have rule we may fail array of keywords by returning a rank of 0
      if (how_many_str === 'all') {
        for (const req_keyword of this.must_have['all']) {
          if (!keywords.includes(req_keyword)) {
            console.log(`ranking is 0 due to lacking ${req_keyword} since it is must_have['all']`)
            return 0
          }
        }
      } else if (how_many_str === 'none') {
        for (const req_keyword of this.must_have['none']) {
          if (keywords.includes(req_keyword)) {
            console.log(`ranking is 0 due to finding ${req_keyword} since it is in must_have['none']`)
            return 0
          }
        }
      } else {
        // if (/^[0-9]+$/.test(how_many_str)) { // commented condition cuz we'll accept 1.0 etc
        const how_many_required = parseInt(how_many_str)
        let how_many_found = 0
        for (const req_keyword of this.must_have[how_many_str]) {
          if (keywords.includes(req_keyword)) {
            if (++how_many_found >= how_many_required) {
              break // and break from for...of (done checking 'none' rule)
            }
          }
        }
        if (how_many_found < how_many_required) {
          console.log(`ranking is 0 due to only finding ${how_many_found} from must_have[${how_many_str}]`)
          return 0 // failed to meet minimum requirement
        }
      }
    }
    // Here we calculate the non-zero ranking based on each keyword priority
    const priority_factors = []
    for (const keyword of keywords) {
      if (keyword in this.keywords) {
        if (typeof this.keywords[keyword].priority === 'number') {
          if (this.keywords[keyword].priority !== 1.0) {
            priority_factors.push(this.keywords[keyword].priority)
          }
        } else {
          console.warn(
            `keywords[${keyword}].priority is set to` +
              `${this.keywords[keyword].priority}\nInterpreting it as 1.0 instead`
          )
        }
      } else {
        console.warn(
          `keywords[${keyword}] is not defined.\n`
            + 'Interpreting it as 1.0 instead'
        )
        missing_keywords.push(keyword)
      }
    }
    return multiplyNoOverflow(...priority_factors)
  }

  assignRankForEach(obj, keywordsAccessor, rank_prop = 'rank') {
    /**
     * assignRankForEach(obj[, keywordsAccessor, rank_prop='rank'])
     * assigns a new property to each item in obj, called 'rank" by default
     * or the value of rank_prop if provided
     * Usaage: call on obj once all rules for its keywords are defined.
     *
     * for info on keywordsAccessor, see comments for the static method
     * resolveKeywordsAccessor(keywordsAccessor)
     */

    keywordsAccessor = this.constructor.resolveKeywordsAccessor(keywordsAccessor)

    let max_ranking = 0
    let missing_keywords = []

    for (const key in obj) {
      // for each obj[key]...
      const keywords = keywordsAccessor(obj, key) // we assess its keywords...

      obj[key][rank_prop] = this.getRankForKeywords(keywords, missing_keywords)

      if (obj[key][rank_prop] > max_ranking) max_ranking = obj[key][rank_prop]
    }
    console.log(max_ranking)
    // TODO: CONTINUE:
    // normalize rankings by max_ranking?
    return this // maybe return missing_keywords?

  }
  


  //////////// private properties  ///////////////////////////////////////////////////////

  /** @private */ 
  _how_many_conversionMessage(method, how_many, keywords, priority) {
    const arg2 = `[${keywords.length} items]`
    const arg3 = typeof priority !== 'undefined' ? '' : `, priority=${priority}`
    return `Converting call to ${method}('${how_many}', ${arg2}${arg3}) to  mustHave('all', ${arg2}${arg3})`
  }
  /** @private */ 
  _priorityErrorMessage(method, k, priority) {
    return `${method}([${k}], ${priority}) prevented by keyword[${k}].priority set to ${priority}`
  }

  /** @private */ 
  _requiredErrorMessage(method, k, required) {
    return `${method}([${k}]) prevented by keyword[${k}].required set to ${required}`
  }
  /** @private */ 
  _presenceInErrorMessage(method, k, because_in) {
    return `${method}([${k}]) prevented by presence of ${k} in ${because_in}`
  }
  
}


exports.KeywordRules = KeywordRules
