const jwt = require("jsonwebtoken");

const generateToken = (id, userType) => {
  return jwt.sign({ id: id ,userRole: userType}, 
	process.env.JWT_SECRET, 
	{ expiresIn : "10m" },
  );
};

module.exports = { generateToken };