const express = require('express')
// const path = require('path');     

const { gh_api_options } = require('./data/gh_api_options.js');
const { companies } = require('./data/companies-on-github.js');

const app = express()
const port = 3000

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'))
// app.use(express.static( path.join( __dirname, '/public' ) ) );

app.get('/', (req, res) => {
  const fs = require('fs');
  const data_endpoints_json = JSON.parse(fs.readFileSync('./data/endpoints.json'));
  res.render('pages/index', { data_endpoints_json });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
