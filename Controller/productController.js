const Product = require("../Models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../Utils/validateMongodbId");


const getProductByProductId = asyncHandler(async (req, res) => {
	try {
		const reqestProductId = req.params.productId;
		validateMongoDbId(reqestProductId);
		var data = await Product.findById(reqestProductId);
		res.json(data);
	}
	catch (error) {
		throw new Error("No data found");
	}
})

module.exports = {
	getProductByProductId
};