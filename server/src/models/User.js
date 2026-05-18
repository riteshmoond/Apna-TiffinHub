import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		phone: { type: String, required: true, unique: true, trim: true },
		email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
		password: { type: String, required: true },
		address: { type: String, default: "", trim: true },
	},
	{ timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
