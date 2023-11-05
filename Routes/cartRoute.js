const express = require("express");

const { 
	addProductToCart,
	getAllAddedProductsInCart,
	updateQuantityFromCart,
	removeProductFromCart
} = require("../Controller/cartController");

const { authMiddleware } = require("../Middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         # User ID associated with the order
 *         userId:
 *           type: string
 *           description: User ID associated with the order
 *           format: objectid
 *           ref: User
 *         # List of items in the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               # Product ID associated with the item
 *               productId:
 *                 type: string
 *                 description: Product ID associated with the item
 *                 format: objectid
 *                 ref: Product
 *               # Quantity of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *                 minimum: 0
 *                 default: 0
 */

/**
 * @swagger
 * paths:
 *   /:
 *     post:
 *       summary: Add a product to the cart
 *       tags:
 *         - Cart
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         description: Product details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         '200':
 *           description: Product added to cart
 *     get:
 *       summary: Get all added products in the cart
 *       tags:
 *         - Cart
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user
 *       responses:
 *         '200':
 *           description: List of products in the cart
 *     put:
 *       summary: Update quantity in the cart
 *       tags:
 *         - Cart
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         description: Product details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         '200':
 *           description: Cart quantity updated
 *     delete:
 *       summary: Remove a product from the cart
 *       tags:
 *         - Cart
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         description: Product details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         '200':
 *           description: Product removed from cart
 */


router.post("/", authMiddleware, addProductToCart);
router.get("/:userId" ,authMiddleware, getAllAddedProductsInCart);
router.put("/", authMiddleware, updateQuantityFromCart);
router.delete("/", authMiddleware, removeProductFromCart);

module.exports = router;


