import razorpay from "razorpay";
import pricing from "../utils/pricing.js";
import MUser from "../database/model/user.js";
import MPayment from "../database/model/payment.js";

class credit {
  creditPricing(req, res) {
    res.status(200).json({
      success: true,
      data: pricing,
    });
  }

  order(req, res) {
    const { id } = req.body;

    const price = pricing.find((item) => item.id === id)?.price;
    const credit = pricing.find((item) => item.id === id)?.credit;

    const options = {
      amount: price * 100,
      currency: "INR",
    };

    const razorpayClient = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    razorpayClient.orders.create(options, async function (err, order) {
      if (order) {
        const result = await MPayment.create({
          userId: req.user,
          razorpayOrderId: order.id,
          amount: price,
          credits: credit,
          paymentStatus: "pending",
        });

        res.status(200).json({
          success: true,
          data: { ...order, _id: result._id },
        });
      }
      if (err) console.log(err);
    });
  }

  async payment(req, res) {
    try {
      const { paymentId, orderId, creditId, _id } = req.body.data;
      const userId = req.user;
      const credit = pricing.find((item) => item.id === creditId).credit;

      await MUser.findByIdAndUpdate(userId, {
        $inc: { "credits.balance": credit },
      });

      await MPayment.findByIdAndUpdate(_id, {
        $set: {
          razorpayId: paymentId,
          razorpayOrderId: orderId,
          paymentStatus: "success",
        },
      });

      res.status(200).json({
        success: true,
        message: "Payment successful",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export default credit;
