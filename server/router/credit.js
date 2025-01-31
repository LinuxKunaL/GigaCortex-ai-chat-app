import express from "express";
import Credit from "../controller/credit.js";

const router = express.Router();
const credit = new Credit();

router.route("/pricing").get(credit.creditPricing);
router.route("/order").post(credit.order);
router.route("/payment").post(credit.payment);

export default router;
