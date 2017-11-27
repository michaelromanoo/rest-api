// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bucketlist = require('./controllers/bucketlist');

//set up mongodb database with mongoose
mongoose.connect('mongodb://localhost/bucketlist', {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;
//check if the connection is successful
db.once('open', function(){
  console.log("Connection to bucketlist on MongoDB was successful");
});
//if not successful show error
db.on("error", function(err){
  console.log(err);
});

//Declaring Port
const port = 3000;

//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cors());

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files

*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send("REST API");
})

//Routing all HTTP requests to /bucketlist to bucketlist controller
app.use('/bucketlist',bucketlist);

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
})
