const Order = require("../Models/orderModel");
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../Utils/validateMongodbId");

const createOrder = asyncHandler(async(req,res) => {
	try
	{
		const {cartId ,userId ,paymentMode} = req.body
		let orderAmount = 0;


		validateMongoDbId(cartId);
		validateMongoDbId(userId);

		//fetch cart details
		const cartDetails = await Cart.findOne({_id : cartId , userId : userId});
		if(!cartDetails)
		{
			return res.status(404).json({ message: 'Cart Details not found' });
		}

		if(cartDetails.items.length === 0)
		{
			return res.status(404).json({ message: 'Add Products In Cart' });
		}
		
		//get product amount 
		const orderItems = await Promise.all(cartDetails.items.map(async (item) => {
			const product = await Product.findById(item.productId);
	  
			if (!product) {
			  throw new Error(`Product not found with Id: ${item.productId}`);
			}
			
			product.quantity = product.quantity - item.quantity;  

			await product.save();

			const totalPrice = product.price * item.quantity;
			orderAmount += totalPrice;
	  
			return {
			  productId: item.productId,
			  price: product.price,
			  quantity: item.quantity
			};
		  }));
		
		  //create order object
		  const order = new Order({
			userId,
			cartId,
			items: orderItems,
			orderAmount,
			isAmountPaid: false,
			paymentMode,
		  });

		
		//save order
		order.isAmountPaid = true;
		const savedOrder = await order.save();

		// Clear the cart items
		cartDetails.items = [];
		await cartDetails.save();

		const response = {
			orderId : savedOrder._id,
			cartId : savedOrder.cartOrder,
			items: savedOrder.items.map(item => ({
				productId: item.productId,
				quantity: item.quantity
			})),
			orderAmount: savedOrder.orderAmount,
			isAmountPaid:savedOrder.isAmountPaid,
			orderDate:savedOrder.orderDate,
			orderStatus:savedOrder.orderStatus,
			paymentMode:savedOrder.paymentMode
		}

		res.json(response);

	}catch(error)
	{
		throw new Error(error.message);
	}
})

const getAllOrder = asyncHandler(async(req,res) => {
	
	try{
		const userId = req.params.userId

		validateMongoDbId(userId);
	
		//fetch cart details
		const orderDetails = await Order.find({ userId : userId});
		if(!orderDetails)
		{
			return res.status(404).json({ message: 'Orders not found' });
		}

		const response = orderDetails.map(order => ({
			orderId : order._id,
			items: order.items.map(item => ({
				productId: item.productId,
				quantity: item.quantity,
				price: item.price
			})),
			orderAmount: order.orderAmount,
			orderDate: order.orderDate,
			isAmountPaid: order.isAmountPaid,
			orderStatus:order.orderStatus,
			paymentMode:order.paymentMode
		  }));
		
		res.json(response);

	}catch(error)
	{
		throw new Error(error.message);
	}
	
})


module.exports = 
{
	createOrder,
	getAllOrder
}