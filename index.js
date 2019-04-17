const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const bookmarksController = require('./controllers/bookmarks')


// instantiate express
const app = express()


// Middleware configuration


// interprets key value pairs in URLs
app.use(parser.urlencoded({extended: true})) 

// converts a json string to the an object and attaches it to req.body
app.use(parser.json()) 

// cors allows connections from all domains
app.use(cors())

// hands off requests on the '/api/bookmarks' route to the bookmarks controller
app.use('/api/bookmarks/', bookmarksController)

app.listen(8080, () => console.log('They see me rollin...on port 8080...'))
