const express = require('express')
const router = express.Router()

const Bookmark = require('../db/models/Bookmark')

router.get('/', (req, res) => {
  // Step 1
   // res.send('<h1>Sup Multiverse?</h1>')

  // Step 2
   // res.json({hello: 'multiverse'})

  // Step 3
  Bookmark
   .find({})
   .then(results => res.json(results))
})

router.get('/:title', (req, res) => {
  // Step 4
  // res.send('this is the title: ' + req.params.title)

  // Step 5
  Bookmark
  // express automatically populates req.params for us
   .find({title: req.params.title})
   .then(bookmarks => res.json(bookmarks))
})

router.post('/', (req, res) => {
  //Step 6
  // create a bookmark from the contents of the body
  Bookmark
    .create(req.body)
    // send the newly created record back as json
    .then(bookmark => res.json(bookmark))
})

router.put('/:title', (req, res) => {

// Step 7
//Postman notes
/*
  - Use A PUT Method
  - Use this route localhost:8080/api/bookmarks/Base%20CS
  - In the header set the Content-Type => application/json
  - Here is a body you can use to update => { "title": "the daoist experience has overwritten Base CS"}
  - Any thing you put in the body to update will overwrite what is currently in the document
  - Remind students they can re-seed whenever and get their default data back
*/

  Bookmark
    .findOneAndUpdate({title: req.params.title}, req.body)
    .then(bookmark => res.json(bookmark))
})

router.delete('/:title', (req, res) => {
  // Step 8
  Bookmark
    .findOneAndRemove({title: req.params.title})
    .then(bookmark => {
      res.json(bookmark)
    })
})


module.exports = router
