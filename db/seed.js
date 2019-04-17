const mongoose = require('./connection')
// import json file
const seeds    = require('./seedData')

const Bookmark = require('./models/Bookmark')

// use the Bookmark model to clear the database of records
Bookmark.remove({}).then(() => {
  console.log('Dropped the DB')
  
  Bookmark.collection.insert(seeds)
    .then(seededEntries => {
      console.log(seededEntries)
      mongoose.connection.close()
    })
})
