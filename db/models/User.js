const mongoose = require('../connection')

const UserSchema = mongoose.Schema({
	email: String,
	name: String,
	favorites: [{
		ref: "Bookmark",
		type: mongoose.Schema.Types.ObjectId
	}]
})

let user = mongoose.model('User', UserSchema)

module.exports = user