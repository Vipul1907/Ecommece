const bodyParser = require("body-parser");
const express = require ('express');
const dbConnect = require('./Helpers/dbConnectHelper');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const loginRoute = require("./routes/loginRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/productCategoryRoute");
const cartRoute = require("./Routes/cartRoute");
const orderRoute = require("./Routes/orderRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'E-commerce documentation',
			version: '1.0.0',
			description: 'A simple Express Node.Js API',
		},
		servers: [
			{
				url: 'http://localhost:8000/',
				description: 'Local server'
			},
		],
	},

	apis: [
		'./Routes/*.js',
		]
};

const swaggerSpecification = swaggerJsDoc(options); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

dbConnect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/session",loginRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
});