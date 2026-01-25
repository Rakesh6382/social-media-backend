import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      location,
      occupation,
    } = req.body;

    // ✅ Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // ✅ Safe file handling
    const picturePath = req.file ? req.file.filename : "";

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      location,
      occupation,
      picturePath,
    });

    const savedUser = await newUser.save();

    // ✅ NEVER send password back
    const userResponse = { ...savedUser._doc };
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
