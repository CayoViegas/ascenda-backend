import express from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/profile", authMiddleware, userController.getProfile);
router.post("/add-friend", authMiddleware, userController.addFriend);

export default router;
