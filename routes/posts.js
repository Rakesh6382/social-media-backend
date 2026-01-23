import express from "express";
import multer from "multer";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* AUTH ROUTES */
router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
