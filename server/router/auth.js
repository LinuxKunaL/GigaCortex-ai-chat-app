import express from "express";
import Auth from "../controller/auth.js";

const router = express.Router();
const auth = new Auth();

router.route("/login").post(auth.login);
router.route("/register").post(auth.register);
router.route("/change-password").post(auth.changePassword);

router.route("/me").get(auth.me);

export default router;
