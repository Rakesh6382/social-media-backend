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

    const picturePath = req.file?.filename;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      location,
      occupation,
      picturePath,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
