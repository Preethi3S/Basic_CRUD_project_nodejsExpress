import express from "express";

import {
  registerUser,
  loginUser,
  currentUser
} from "../Controllers/userController.js";

import ValidateToken from "../middlewares/validateTokenHandler.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", ValidateToken ,  currentUser);

export default router;
