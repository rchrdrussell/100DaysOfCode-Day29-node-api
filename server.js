/*Import project dependencies*/
const express = require('express'); //Used to build REST APIs
const bodyParser = require('body-parser'); //Parse request and create req.body object`
const cors = require('cors'); //Provides Express middleware to enable CORS with various options.

/*Initialize Express server*/
const app = express();

/*Call body-parser and cors middleware using app.use()*/
var corsOptions = {
	origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));
//Parse requests of content type - application/json
app.use(bodyParser.json());
//Parse requests of content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

/*Connect to Mongoose Database*/
const db = require('./app/models');
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to Mongo Database!");
	})
	.catch(err => {
		console.log("Cannot connect to the database!", err);
	});

/*Create default route*/
app.get('/', (req, res) => {
	res.json({message: 'Welcome to the REST API'}); 
});

/*Set port, listen for requests*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
