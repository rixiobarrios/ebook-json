const express = require("express");
const router = express.Router();

// import the user model
const User = require("../db/models/User");
const Bookmark = require("../db/models/Bookmark");

router.get("/", (req, res) => {
  User.find().then(allUsers => {
    res.json(allUsers);
  });
});

router.get("/:email", (req, res) => {
  const userEmail = req.params.email;
  User.findOne({ email: userEmail }).then(user => {
    res.json(user);
  });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  User.create(newUser).then(created => {
    res.json(created);
  });
});

// in this case, we will use two models and the refs to link them
// sample body payload:
/*
{
  "user" : {
    "name": "test relation",
    "email": "test@email.com"
  },
  "bookmark": {
    "title" : "test",
    "url": "http://test.com"
  }
}
*/
router.post("/new", (req, res) => {
  User.create(req.body.user).then(newUser => {
    Bookmark.create(req.body.bookmark).then(newBookmark => {
      // push new bookmark id into user.favorites array
      newUser.favorites.push(newBookmark._id);
      // push new user id into bookmark.favorited array
      newBookmark.favorited.push(newUser._id);

      // save both or they wont persist
      newUser.save();
      newBookmark.save();
      // send entire document back
      res.json(newUser);
    });
  });
});

// favorite a bookmark by a user id
router.put("/:id/:bookmarkId", (req, res) => {
  const userID = req.params.id;
  const bookmarkID = req.params.bookmarkId;

  // find the bookmark by its id
  Bookmark.findById(bookmarkID).then(mark => {
    // find the user by its id
    // could also swap this out with email
    User.findOneAndUpdate({ _id: userID }).then(user => {
      // push each id into the others array
      user.favorites.push(mark._id);
      mark.favorited.push(user._id);
      // save both
      user.save();
      mark.save();

      // send json response
      res.json(user);
    });
  });
});

router.put("/:id", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body).then(prevRecord => {
    res.json(prevRecord);
  });
});

router.delete("/:id", (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }).then(deleted => {
    res.json(deleted);
  });
});

module.exports = router;
