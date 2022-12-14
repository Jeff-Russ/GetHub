const fs = require('fs');
const express = require('express')
// const path = require('path');     

const app = express()
const port = 3000

app.set('views', __dirname + '/views');


app.use(express.static('public'))
// app.use(express.static( path.join( __dirname, '/public' ) ) );

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
