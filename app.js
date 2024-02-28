var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://oleslukasz7:vFXlVZKevv1b04Cn@cluster0.dtoeuja.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

var axios = require('axios');
var data = JSON.stringify({
  "collection": "projects",
  "database": "projects",
  "dataSource": "Cluster0",
  "projection": {
    "_id": 1
  }
});

var config = {
  method: 'post',
  url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-otuuz/endpoint/data/v1/action/findOne',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': '9c6TKnAVuOm7ckSZAnAMKLpQMBz1hIiU6rUp0ICWLHaI2r1ereRRW0aCvvbgGQcb',
  },
  data: data
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });


var app = express();
app.use(express.json());
app.post('/api/submit', async (req, res) => {
  const db = client.db('messages');
  const collection = db.collection('messages');
  console.log('req body:',req.body);
  
  // Extract data from the form
  const { name, email, message } = req.body;
  
  try {
    // Save form data to MongoDB
    const result = await collection.insertOne({
      name,
      email,
      message,
    });
    
    res.json({ message: 'Form data saved successfully', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error saving form data to MongoDB', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/data', async (req, res) => {
  const db = client.db('projects');
  const collection = db.collection('projects');

  try {
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('node_modules/bootstrap-icons/font'));
app.use('/assets', express.static('node_modules/particles.js'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors({
  origin: 'https://lukaszoles.onrender.com', // Replace with your app's domain
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
