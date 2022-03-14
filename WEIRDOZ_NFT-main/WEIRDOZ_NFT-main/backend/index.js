const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/back-mint.js');
const path = require('path')
const app =  express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api/', routesHandler);

app.use(express.static(__dirname + '/build/'));

app.get('*', (req, res) => {
   return res.sendFile(path
     .join(__dirname + '/build/', 'index.html'))
 });

const PORT= 4000;  //backend running port , 3000 for frontend
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
