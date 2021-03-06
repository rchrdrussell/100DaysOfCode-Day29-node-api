const db = require('../models');
const Tutorial = db.tutorials;

//Create and save a new tutorial
exports.create = (req, res) => {
	//Validate request
	if(!req.body.title){
		res.status(400).send({message: "Content can not be empty!"});
		return;
	}

	//Create a tutorial
	const tutorial = new Tutorial ({
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published: false //What is the ?
	});

	//Save tutorial in the database
	tutorial
	  .save(tutorial)
	  .then(data => {
		  res.send(data);
	  })
	  .catch(err => {
		  res.status(500).send({
			  message:
			    err.message || "Some error occured while making the database."
		  });
	  });

};


/*Retrieve all tutorials from the database
 * We use req.query.title to get the query string from the Request and consider
 * it as condition for findAll() method.*/
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? {title: { $regex: new RegExp(title), $options: "i" } } : {}; //what is this code??

	Tutorial.find(condition)
	  .then(data => {
		  res.send(data);
	  })
	  .catch(err => {
		  res.status(500).send({
			  message:
			  	err.message || "Some error occured while retrieving the data."
		  });
	  });
};

//Find a single tutorial with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Tutorial.findById(id)
	  .then(data => {
		  if(!data){
			  res.status(404).send({message: "Data with id " + id + " cannot be found!"});
		  }else{
			  res.send(data);
		  }
	  })
	  .catch(err => {
		  res
		    .status(500)
		    .send({message: "Error retrieving data with id: " + id});
	  });
};

//Update a tutorial by the id in the request
exports.update = (req, res) => {
	if(!req.body){
		return res.status(400).send({message: "You cannot empty out the data!"});
	}

	const id = req.params.id;

	Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
	  .then(data => {
		  if(!data){
			  res.status(404).send({message: "Cannot find tutorial with that id!"});
		  }else{
			  res.send({message: "Tutorial was updated successfully!"});
		  }
	  })
	  .catch(err => {
		  res.status(500).send({message: "Error updating Tutorial!"});
	  });
};

//Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Tutorial.findByIdAndRemove(id)
	  .then(data => {
		  if(!data){
			  res.status(404).send({message: "Cannot delete data!"});
		  }else{
			  res.send({message: "Tutorial was deleted successfully!"});
		  }
	  })
	  .catch(err => {
		  res.status(500).send({message: "Could not delete tutorial!"});
	  });
};

//Delete all tutorials from the database
exports.deleteAll = (req, res) => {
	Tutorial.deleteMany({}) //what does ({}) mean?
	  .then(data => {
		  res.send({message: "All data successfully deleted"});
	  })
	  .catch(err => {
		  res.status(500).send({message: "Some error occured"});
	  });
};

//Find all published tutorials
exports.findAllPublished = (req, res) => {
	Tutorial.find({published: true})
	  .then(data => {
		  res.send(data);
	  })
	  .catch(err => {
		  res.status(500).send({message: "Some error occured"});
	  });
};

