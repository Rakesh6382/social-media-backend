import express from "express";
import { login, register } from "../controllers/auth.js";
import multer from "multer";

const router = express.Router();

/* Multer setup (Render safe) */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp"); // ✅ Render writable directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* Routes */
router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
