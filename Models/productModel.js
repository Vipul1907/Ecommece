const mongoose = require('mongoose'); 


var productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		minValue: 0
	},
	description: {
		type: String,
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ProductCategory",
	},
	quantity: {
		type: Number,
		required: true
	},
	availability: {
		type: Boolean,
		default: false,
	}

},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);