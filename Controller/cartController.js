const Cart = require("../Models/cartModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../Utils/validateMongodbId");



const addProductToCart = asyncHandler(async (req, res) => {
	try {

		const { userId, items } = req.body;

		const cart = await Cart.findOneAndUpdate(
			{ userId },
			{ $setOnInsert: { userId } },
			{ new: true, upsert: true }
		);

		for (const item of items) {
			validateMongoDbId(item.productId)
			

			const productIndex = cart.items.findIndex(cartItem => cartItem.productId.equals(item.productId));

			if (productIndex > -1) {
				cart.items[productIndex].quantity += item.quantity;
			} else {
				cart.items.push(item);
			}
		}

		await cart.save();

		const response = {
			cartId: cart._id,
			userId: cart.userId,
			items: cart.items.map(item => ({
				productId: item.productId,
				quantity: item.quantity
			}))
		};

		res.status(200).json(response);
	} catch (error) {
		throw new Error(error);
	}
})


const getAllAddedProductsInCart = asyncHandler(async (req, res) => {
	try {
		const userId = req.params.userId;
		const cartDocument = await Cart.findOne({ userId: userId });

		if (!cartDocument) {
			return res.status(404).json({ message: 'Cart Details not found' });
		}

		const response = {
			cartId: cartDocument._id,
			userId: cartDocument.userId,
			items: cartDocument.items.map(item => ({
				productId: item.productId,
				quantity: item.quantity
			}))
		};

		res.json(response);
	} catch (error) {
		throw new Error(error);
	}
})


const updateQuantityFromCart = asyncHandler(async (req, res) => {
	try {
		const { cartId, userId, items } = req.body;

		const cartDetails = await Cart.findOne({ _id: cartId, userId: userId });
		if (!cartDetails) {
			return res.status(404).json({ message: 'Cart Details not found' });
		}

		for (const item of items) {
		    validateMongoDbId(item.productId)
			
			const productIndex = cartDetails.items.findIndex(cartItem => cartItem.productId.equals(item.productId));

			if (productIndex > -1) {
				cartDetails.items[productIndex].quantity = item.quantity;
			} else {
				cartDetails.items.push(item);
			}
		}

		await cartDetails.save();
		res.json(req.body);
	} catch (error) {
		throw new Error(error);
	}
})


const removeProductFromCart = asyncHandler(async (req, res) => {
	try {
		const { cartId, productId } = req.body;

		validateMongoDbId(productId);
		
		const updatedCart = await Cart.findByIdAndUpdate(
			cartId,
			{ $pull: { items: { productId: productId } } },
			{ new: true }
		  );
	  
		  if (!updatedCart) {
			return res.status(404).send('Cart Details found');
		  }
	  
		  res.status(200).json();

	} catch (error) {
		throw new Error("Error while adding in cart");
	}
})


module.exports =
{
	addProductToCart,
	getAllAddedProductsInCart,
	updateQuantityFromCart,
	removeProductFromCart
}