const User = require("../Models/userModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../Helpers/jwtTokenHelper");



const createUser = asyncHandler(async (req, res) => {
	const email = req.body.profile.email;
	const findUser = await User.findOne({ email: email });

	if (!findUser) {
		if (req.body.userType == "ADMIN") {
			req.body.isAdmin = true
		}

		const newUser = await User.create(req.body);

		res.json(newUser);

	} else {
		throw new Error("User Already Exists");
	}
});


const loginUser = asyncHandler(async (req, res) => {
	const { userName, password } = req.body;
	const findUser = await User.findOne({ userName });
	
	if (findUser && (await findUser.isPasswordMatched(password))) {
		const generatedToken = await generateToken(findUser?._id, findUser?.userType);

		res.json({
			_id: findUser?._id,
			firstname: findUser?.firstname,
			lastname: findUser?.lastname,
			email: findUser?.userName,
			token: generatedToken,
		});
	} else {
		throw new Error("Invalid Credentials");
	}
});



module.exports = {
	createUser,
	loginUser
}