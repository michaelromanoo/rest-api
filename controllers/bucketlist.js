//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bucketlist = require('../models/list');


//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    //call getAllLists()
    bucketlist.getAllLists((err, lists) => {
      if (err) {
        res.json({success: false, message: 'Failed to load all lists. Error: ${err}'});
      }
      else {
        res.write(JSON.stringify({success: true, lists: lists},null,2));
        res.end();
      }
    });
});

//POST HTTP method to /bucketlist
router.post('/', (req,res,next) => {
    //create a new list instance
    let newList = new bucketlist({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    });
    //add the instance to the database
    bucketlist.addList(newList, (err,list) => {
      if (err) {
        res.json({sucess: false, message: 'Failed to create a new list. Error: ${err}'});
      }
      else {
        res.json({sucess: true, message: 'Added successfully!!'});
      }
    });
});

//UPDATE HTTP Method to update an object in a field
router.put('/:id', (req,res,next) => {
    let id = req.params.id;
    let query = req.body;
    bucketlist.findByIdAndUpdate(id, query, (err,list) => {
    if(err) {
      res.json({success:false, message: 'Failed to delete the list. Error: ${err}'});
    }
    else {
      res.json({success: true, message: 'Upadated Successfully!'});
    }
  });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    let id = req.params.id;
    bucketlist.deleteListById(id, (err,list) => {
      if(err) {
        res.json({success: false, message: 'Failed to delete the list. Error: ${err}'});
      }
      else if (list) {
        res.json({success:true, message:'Deleted successfully'});
      }
      else
      res.json({success: false});
    })
});

module.exports = router;
