const mongoose = require("../connection");

// define a schema that takes an object of key/value pairs
// the key is the name of the field
// the value is the type of data it will be
// https://mongoosejs.com/docs/schematypes.html
const BookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  favorited: [
    {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

// creates a model using the schema, and attaches it to our mongoose instance.
// a model is used to query and change data in the database
const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

//export the instantiated model. Think of this like creating a new class
module.exports = Bookmark;
