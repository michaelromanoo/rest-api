const mongoose = require('mongoose');
//intialise database
var BucketListSchema = mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  description : String,
  category: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low']
  }
});
//export database
var BucketList =  module.exports = mongoose.model('BucketList', BucketListSchema);
//database functions
//get a field from the database
module.exports.getAllLists = (callback) => {
  BucketList.find(callback);
}
//add a new field to the database
module.exports.addList = (newList, callback) => {
  newList.save(callback);
}
//delete a field in the database
module.exports.deleteListById = (id, callback) => {
  let query = {_id: id};
  BucketList.remove(query, callback);
}
//update a field in the database
module.exports.updateListById = (id, property, callback) => {
  let query = {_id : id};
  let params = req.body;
  BucketList.findByIdAndUpdate(query, params, callback);
}

