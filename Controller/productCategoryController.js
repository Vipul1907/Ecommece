const Category = require("../Models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const Product = require("../Models/productModel");
const validateMongoDbId = require("../Utils/validateMongodbId");


const getAllCategories = asyncHandler(async(req, res) => {
	try{
		const listOfCategory = await Category.find();
		res.json(listOfCategory);
	}catch(error){
		throw new Error("No categories Found");
	}
});


const getProductsBasedOnCategoryId = asyncHandler(async (req, res) => {
	try {
		const reqCategoryId = req.params.categoryId;
		validateMongoDbId(reqCategoryId);
		const productsBasedOnCategory =  await Product.find({ categoryId: req.params.categoryId }, 'title price description availability _id');		
		res.json(productsBasedOnCategory);
	}
	catch (error) {
		throw new Error("No data found");
	}
})


module.exports =
{
	getAllCategories,
	getProductsBasedOnCategoryId
}