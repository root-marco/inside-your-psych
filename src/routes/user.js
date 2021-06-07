import express from "express";
import * as user from "../controllers/user.js";

const router = express.Router();

router.get("/login", user.login);
router.get("/register", user.register);
router.post("/register", user.registerNew);
router.post("/login", user.loginNew);
router.get("/logout", user.logout);

export default router;