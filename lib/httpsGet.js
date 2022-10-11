const https = require('https');

async function httpsGet(url, options, error_cb) {
  /**
   * returns response body (Buffer.concat(chunks).toString())
   * or passes caught error to error_cb if  error_cb is defined
   * else, caught error is passed to console.error
   * Example usage: anonymous async function to execute some code synchronously after http request:
    
  const { httpsGet } = require('./httpsGet.js');

  (async function () {
    // wait to http request to finish
    let response_body = await httpsGet('https://raw.githubusercontent.com/d2s/companies/master/src/index.md');
    console.log(response_body)
    // code here be executed after http request is finished
  })();

   * You can optionally pass an options object as the second argument, such as 
  
  (async function () {
    const options = {
      headers: {
        accept: "application/vnd.github+json",
        authorization: "Bearer INSERTTOKEN"
      }
    }
  
    // wait to http request to finish
    let response_body = await httpsGet('https://api.github.com/orgs/ionic-team/outside_collaborators', options);
    console.log(response_body)
    // code here be executed after http request is finished
  })();

   */
  const args = [url]
  if (options) args.push(options)

	try {
    return await new Promise((resolve, reject) => {
      https.get(...args, (response) => {
        // response.setEncoding('utf8')
        let chunks = []
        response.on('data', chunk => { chunks.push(chunk) } )
        response.on('end', () => { resolve(Buffer.concat(chunks).toString()) } )
        response.on('error', error => {
          response.resume(); // consume response data to free up memory
          reject(error) 
        })
      });
    }); 
	}
	catch(error) {
    res.resume(); // consume response data to free up memory
    if (error_cb) error_cb(error)
		else console.error(error)
	}
}

// module.exports.httpsGet = httpsGet


exports.httpsGet = httpsGet

// (async function () {
//   // wait to http request to finish
//   let response_body = await httpsGet('https://raw.githubusercontent.com/d2s/companies/master/src/index.md');
//   console.log(response_body)
//   // code here be executed after http request is finished
// })();

// function testCb() {
//   console.log(arguments)
// }


// function test (url, headers) {
//   let two_args = [url]
//   if (headers) {
//     two_args.push({
//       headers
//     })
//   }
//   testCb(...two_args)
// }

// test("arg1", null, 'arg2')

// test("arg1", {Authorization: 'authKey'})

