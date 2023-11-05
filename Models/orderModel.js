const mongoose = require("mongoose");


var orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User"
		},

		cartId: {
			type: mongoose.Schema.ObjectId,
			ref: "Cart"
		},

		items: [{
			productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
			price: { type: Number },
			quantity: { type: Number }
		}],

		orderAmount: { type: Number },

		isAmountPaid: { type: Boolean, default: false },
		orderDate: { type: Date, default: Date.now() },
		orderStatus: {
			type: String,
			default: "Processing",
			enum: [
				"Processing",
				"Dispatched",
				"Cancelled",
				"Delivered",
			],
		},
		paymentMode: {
			type: String,
			default: "COD-Cash On Delivery",
			enum: [
				"COD-Cash On Delivery",
				"Card Payment",
				"Wallet Payment",
				"Net Banking",
			],
		}
	}
);

module.exports = mongoose.model("Order", orderSchema);
