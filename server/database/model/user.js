import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  credits: {
    balance: {
      type: Number,
      default: 1000,
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(5);

    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({ _id: this._id }, config.jwt);
  } catch (error) {
    throw error;
  }
};

userSchema.methods.reduceCredit = async function (token) {
  try {
    if (this.credits.balance < token) {
      throw new Error("Not enough credits");
    }
    this.credits.balance -= token;
    return await this.save();
  } catch (error) {
   throw error
  }
};

const MUser = model("user", userSchema);

export default MUser;
