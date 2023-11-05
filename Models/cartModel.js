const mongoose = require('mongoose');


var cartSchema = new mongoose.Schema(
	{
		userId:{
			type:mongoose.Schema.ObjectId,
			ref:"User"
		},
		items:[
			{
				productId:{
					type:mongoose.Schema.ObjectId,
					ref:"Product"
				},
				quantity:{
					type:Number,
					minValue:0,
					default:0
				}
			}
		]
	},
	{
		timestamps:true
	}
);

module.exports = mongoose.model("Cart",cartSchema);