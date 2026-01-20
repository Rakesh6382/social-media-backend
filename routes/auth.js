import express from "express";
import { login, register } from "../controllers/auth.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();

/* Multer setup */
const uploadPath = "public/assets";

/* REQUIRED for Render (folder does not exist by default) */
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* Routes */
router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
