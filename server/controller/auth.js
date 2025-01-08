import MUser from "../database/model/user.js";

class Auth {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("All fields are required");
      }

      const user = await MUser.findOne({ email });

      if (user === null) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = await user.generateToken();

      res.status(200).json({
        message: "Login successful ✅",
        token,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  };

  register = async (req, res) => {
    try {
      const { name, email, password, avatar } = req.body;

      if (!name || !email || !password || !avatar) {
        throw new Error("All fields are required");
      }

      await MUser.create({ name, email, password, avatar });

      res.status(201).json({
        message: "User registered successfully ✅",
      });
    } catch (error) {
      if (error.name === "MongoServerError") {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        throw new Error("All fields are required");
      }

      if (oldPassword === newPassword) {
        throw new Error("New password must be different from old password");
      }

      const user = await MUser.findById(req.user);

      const isMatch = await user.comparePassword(oldPassword);

      if (!isMatch) {
        return res.status(400).json({ error: "oldPassword is incorrect" });
      }

      user.password = newPassword;
      await user.save();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).send({ message: "Password changed successfully ✅" });
  };

  me = async (req, res) => {
    try {
      const _id = req.user;

      const user = await MUser.findById(_id, {
        password: 0,
        __v: 0,
        createdAt: 0,
      });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
export default Auth;
