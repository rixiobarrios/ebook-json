const express = require("express");
const router = express.Router();

// import the bookmark model
const Bookmark = require("../db/models/Bookmark");

router.get("/", (req, res) => {
  // option 1, just send some html back
  // res.send('<h1>Sup Multiverse?</h1>')

  // option 2, send a regular object back
  // res.json({hello: 'multiverse'})

  // option 3, use the model to look up data in mongodb
  // send back the data as json
  Bookmark.find({}).then(allBookmarks => res.json(allBookmarks));
});

router.get("/:title", (req, res) => {
  // option 1
  // send back the title parameter in a string
  // res.send('this is the title param: ' + req.params.title)

  // option 2
  // use the model to look up a bookmark by title
  Bookmark
    // express automatically populates req.params for us
    .find({ title: req.params.title })
    .then(bookmarks => res.json(bookmarks));
});

router.post("/", (req, res) => {
  const newBookmark = req.body;
  // option 1
  // console log the request body
  // console.log(newBookmark)
  // and send the request back just as we received it
  // res.json(newBookmark)

  // option 2
  // create a bookmark from the contents of the body
  Bookmark.create(req.body)
    // send the new record back as json
    .then(bookmark => res.json(bookmark));
});

router.put("/:title", (req, res) => {
  // look up the bookmark by title
  // use .findOneAndUpdate to find the title
  // update with the new values passed in from request body

  Bookmark.findOneAndUpdate({ title: req.params.title }, req.body, {
    new: true
  }).then(bookmark => res.json(bookmark));
});

router.delete("/:title", (req, res) => {
  // use title as a param to find the record we want to remove
  Bookmark.findOneAndDelete({ title: req.params.title }).then(bookmark => {
    // send back the deleted document
    res.json(bookmark);
  });
});

module.exports = router;
