const express = require("express");
const {getProductByProductId} = require("../Controller/productController");
const router = express.Router();
const {authMiddleware } = require("../Middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - quantity
 *       properties:
 *         title:
 *           type: string
 *           description: Product title
 *           required: true
 *           unique: true
 *           trim: true
 *         price:
 *           type: number
 *           description: Product price
 *           required: true
 *           minimum: 0
 *         description:
 *           type: string
 *           description: Product description
 *         categoryId:
 *           type: string
 *           description: Product category ID
 *         quantity:
 *           type: number
 *           description: Product quantity
 *           required: true
 *         availability:
 *           type: boolean
 *           description: Product availability
 *           default: false
 */

/**
 * @swagger
 * /:
 *  get:
 *    summary: Get the product
 *    response:
 *      200:
 *        description: get the product
 *        content:
 *          application/json:
 *             schema:
 *                type: array 
 * 
 */

//get products using product id
router.get("/:productId",authMiddleware, getProductByProductId);


module.exports = router;