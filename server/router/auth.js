import express from "express";
import Auth from "../controller/auth.js";

const router = express.Router();
const auth = new Auth();

router.route("/me").get(auth.me);

export default router;