import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  credits: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
  },
  razorpayId: {
    type: String,
  },
  razorpayOrderId: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
});

const MPayment = model("payments", paymentSchema);

export default MPayment;
