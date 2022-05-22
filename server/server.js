const  express = require("express");
const  mongoose = require("mongoose");
const bodyParser = require( "body-parser");
const cors = require('cors')
const api = require("./api")
const morgan =  require("morgan")
const config = require('./config/database');
const server = require('http').createServer();


const app = express();

app.set('port', (process.env.PORT || 5000))

// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors())

app.use('/api', api)
app.use(express.static('static'))

app.use(morgan('dev'))

// unknown route

app.use(function(req, res) {
  const err = new Error('Not found')
  err.status = 404
  res.json(err)
})


// DB Config
const mongoURI = config.dbHost;
const db = mongoURI;

console.log(db);
// Connect to MongoDB
mongoose
  .connect("mongodb://admin:admin@mongo:27017/pweb",{ useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  console.log(mongoose.connection.readyState)
const port = process.env.PORT || 5000;
app.listen(app.get('port'), function () { 
  console.log(`Server running on port ${ app.get('port') } !`)
});
console.log(mongoose.connection.readyState)

