import express from "express";
import { addToCart, removeFromCart, getCart, updateQuantity, clearCart } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/", auth, getCart);
cartRouter.post("/add", auth, addToCart);
cartRouter.post("/remove", auth, removeFromCart);
cartRouter.post("/update", auth, updateQuantity);
cartRouter.delete("/clear", auth, clearCart);

export default cartRouter;
