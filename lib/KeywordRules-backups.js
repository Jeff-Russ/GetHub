

// BACKUPS:

class KeywordRules {

  assignRankForEach(obj, accessKeywords, rank_prop = 'rank') {
    /**
     * assignRankForEach(obj[, accessKeywords, rank_prop='rank'])
     * assigns a new property to each item in obj, called 'rank" by default
     * or the value of rank_prop if provided
     * Usaage: call on obj once all rules for its keywords are defined.
     *
     * if accessKeywords is callable:
     *  it is called for each key in obj with accessKeywords(obj, key)
     *  and should return an array of keywords for obj[key]
     * if accessKeywords is a string:
     *  it be a string of what appears after obj[key] to access an array
     *  of keywords. for example if accessKeywords = `.about['keywords']`
     *  then obj.about['keywords'] should return an array of keywords
     * if accessKeywords is not provided:
     *  each obj[key] must be an array of keywords
     * prop_chain_string is the path through object to the array of keywords
     */
    if (typeof accessKeywords === 'string') {
      const prop_chain_string = accessKeywords
      accessKeywords = (obj, key) => {
        const expr = `obj[\"${key}\"]${prop_chain_string}`
        return eval(expr)
      }
    } else if (typeof accessKeywords === 'undefined') {
      accessKeywords = (obj, key) => obj[key]
    }
    let max_ranking = 0

    for (const key in obj) {
      // for each obj[key]...
      const keywords = accessKeywords(obj, key) // we assess its keywords...

      let ranking = 1 // ...and we assign a ranking.

      for (const how_many_str in this.must_have) {
        // for each must_have rule...
        // ...we pass or fail the obj[key]. fail: ranking becomes 0, pass, it stays at 1.

        if (how_many_str === 'all') {
          for (const req_keyword of this.must_have['all']) {
            if (!keywords.includes(req_keyword)) {
              ranking = 0 // if any are not found, we fail
              console.log(`ranking is 0 due to lacking ${req_keyword} since it is must_have['all']`)
              break // and break from for...of (done checking 'all' rule)
            }
          }
        } else if (how_many_str === 'none') {
          for (const req_keyword of this.must_have['none']) {
            if (keywords.includes(req_keyword)) {
              ranking = 0 // if any are found, we fail
              console.log(`ranking is 0 due to finding ${req_keyword} since it is in must_have['none']`)
              break // and break from for...of (done checking 'none' rule)
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
            ranking = 0 // failed to meet minimum requirement
          }
        }
        // Once we fail (ranking === 0), no other rule matters so we:
        if (ranking === 0) break // break from inner for...in loop.
      }
      if (ranking === 0) {
        // We fail the obj[key] so we don't
        // need to calculate the raking based on each keyword priority.
        obj[key][rank_prop] = 0 // We just assign it a big ol' goose egg,
        // continue // ...and move on to next obj[key],
      } else {
        // prolly don't need else if we have continue but whatever.
        // Here we calculate the raking based on each keyword priority
        max_ranking = 1
        const missing_keywords = []
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
        obj[key][rank_prop] = multiplyNoOverflow(...priority_factors)
        if (obj[key][rank_prop] > max_ranking) max_ranking = obj[key][rank_prop]
      }
    }
    console.log(max_ranking)
    // TODO: CONTINUE:
    // normalize rankings by max_ranking?
    return this // maybe return missing_keywords?
  }
}
