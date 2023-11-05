const express = require("express");
const {  getProductsBasedOnCategoryId  } = require("../Controller/productCategoryController");
const router = express.Router();

const { authMiddleware } = require("../Middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     ProdCategory:
 *       type: object
 *       properties:
 *         # Title of the product category
 *         title:
 *           type: string
 *           description: Title of the product category
 *           required: true
 *           unique: true
 *           index: true
 */

/**
 * @swagger
 * /:
 *  get:
 *    summary: Get the with category product
 *    response:
 *      200:
 *        description: get the with category product
 *        content:
 *          application/json:
 *             schema:
 *                type: array 
 * 
 */


router.get("/:categoryId/products", authMiddleware, getProductsBasedOnCategoryId);

module.exports = router;
