const fs = require('fs');
const http = require('http');
const express = require('express')


const { gh_api_options } = require('./data/gh_api_options.js');
const { httpsGet } = require('./lib/httpsGet.js');
const { companies } = require('./data/companies-on-github.js');

const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))

// async function diplayGitHubAPIJson(endpoint) {
//   const raw_res_body = await httpsGet(`https://api.github.com/users/${endpoint}`, gh_api_options)
//   const json = JSON.parse(raw_res_body)

//   const tree = jsonview.create(json);
//   jsonview.render(tree, document.querySelector('.root'));
//   jsonview.expand(tree);
// }

// app.get('/', (req, res) => {
//   res.render('pages/index')
//   // diplayGitHubAPIJson(`/users/${company[0].gh_handle}/repos`)
// })

app.get('/', (req, res) => {
  const fs = require('fs');
  const data_endpoints_json = JSON.parse(fs.readFileSync('./data/endpoints-ordered.json'));
  res.render('pages/index', { data_endpoints_json });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})



// // create a server object wthout express:
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'}); // http header

//   if (req.url === '/') {
//     res.write('<h1>Hello World!<h1>'); //write a response
//     res.end(); //end the response
//   } else if(req.url ==='/page1'){
//     res.write('<h1>about us page<h1>'); //write a response
//     res.end(); //end the response
//   } else if(req.url ==='/page2'){
//     res.write('<h1>contact us page<h1>'); //write a response
//     res.end(); //end the response
//   } else{
//     res.write('<h1>404?<h1>'); //write a response
//     res.end(); //end the response
//   }
// }).listen(3000, function(){
//  console.log("server start at port 3000"); //the server object listens on port 3000
// });