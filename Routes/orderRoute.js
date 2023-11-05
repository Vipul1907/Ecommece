const express = require("express");

const { 
	createOrder,
	getAllOrder
} = require("../Controller/orderController");

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
 *         # Cart ID associated with the order
 *         cartId:
 *           type: string
 *           description: Cart ID associated with the order
 *           format: objectid
 *           ref: Cart
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
 *               # Price of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               # Quantity of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *         # Total order amount
 *         orderAmount:
 *           type: number
 *           description: Total order amount
 *         # Indicates if the amount has been paid
 *         isAmountPaid:
 *           type: boolean
 *           description: Indicates if the amount has been paid
 *           default: false
 *         # Date of the order
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: Date of the order
 *           default: Date.now()
 *         # Status of the order
 *         orderStatus:
 *           type: string
 *           description: Status of the order
 *           default: Processing
 *           enum:
 *             - Processing
 *             - Dispatched
 *             - Cancelled
 *             - Delivered
 *         # Payment mode used for the order
 *         paymentMode:
 *           type: string
 *           description: Payment mode used for the order
 *           default: COD-Cash On Delivery
 *           enum:
 *             - COD-Cash On Delivery
 *             - Card Payment
 *             - Wallet Payment
 *             - Net Banking
 */

/**
 * @swagger
 * paths:
 *   /:
 *     post:
 *       summary: Create an order
 *       responses:
 *         '200':
 *           description: Order created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *   /{userId}:
 *     get:
 *       summary: Get a user by ID
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user
 *       responses:
 *         '200':
 *           description: User found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 */


router.post("/", authMiddleware, createOrder);

router.get("/:userId", authMiddleware, getAllOrder);


module.exports = router;
