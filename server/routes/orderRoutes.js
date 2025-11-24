import express from "express"
import auth from "../middlewares/auth.js";
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";

const orderRouter = express.Router()

orderRouter.post("/", auth, createOrder);
orderRouter.get("/my-orders", auth, getMyOrders);
orderRouter.get("/:id", auth, getOrderById);


 export default orderRouter