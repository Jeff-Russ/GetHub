const fs = require('fs');
const express = require('express')
// const path = require('path');     

// const { gh_api_options } = require('./data/gh_api_options.js');
const { companies } = require('./data/companies-on-github.js');

const { get } = require('./lib/data-object-helpers.js');

const app = express()
const port = 3000

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'))
// app.use(express.static( path.join( __dirname, '/public' ) ) );

// app.get('/', (req, res) => {
//   const endpoints_json = JSON.parse(fs.readFileSync('./data/endpoints.json'));
//   // endpoints_json.get = get
//   res.render('pages/index', { endpoints_json, companies });
// });

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
