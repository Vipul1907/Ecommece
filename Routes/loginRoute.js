
const express=require("express");
const { createUser ,loginUser} = require("../controller/sessionController");

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
 *   /users/register:
 *     post:
 *       summary: Register a new user
 *       tags:
 *         - Users
 *       requestBody:
 *         description: User object
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: User successfully registered
 *         '400':
 *           description: Invalid input, user not registered
 *   /users/login:
 *     post:
 *       summary: Login a user
 *       tags:
 *         - Users
 *       requestBody:
 *         description: User credentials
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: User logged in successfully
 *         '401':
 *           description: Unauthorized, incorrect credentials
 */


router.post("/register",createUser);
router.post("/login",loginUser);

module.exports=router;