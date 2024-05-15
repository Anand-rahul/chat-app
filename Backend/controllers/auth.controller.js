import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords dont match" });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.userName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  console.log("login");
};

export const logout = (req, res) => {
  console.log("logout");
};
