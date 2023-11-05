const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
	console.log("connection string : "+ process.env.MONGODB_URL)
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DATAbase error");
  }
};
module.exports = dbConnect;