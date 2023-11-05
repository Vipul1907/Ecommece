const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


var userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		userType: {
			type: String,
			default: "CUSTOMER",
			enum: [
				"ADMIN",
				"MERCHANT",
				"CUSTOMER"
			]
		},
		profile: {
			firstName: { type: String },
			lastName: { type: String },
			email: { type: String, required: true },
			phoneNumber: { type: String, required: true }
		},
		address: {
			addressLine1: { type: String, required: true },
			addressLine2: { type: String, required: true },
			pinCode: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		createdOn: {
			type: Date,
			required: true,
			default: new Date()
		},
		isAdmin: { 
			type: Boolean, 
			default: false
		}
	},
	{
		timestamps: true,
	}
);


userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSaltSync(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});


userSchema.methods.isPasswordMatched = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.createPasswordResetToken = async function () {
	const resettoken = crypto.randomBytes(32).toString("hex");
	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resettoken)
		.digest("hex");
	this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
	return resettoken;
};

module.exports = mongoose.model("User", userSchema);