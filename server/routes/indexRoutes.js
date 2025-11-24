import express from "express"
import authRoutes from "./authRoutes.js"
import productRoutes from "../routes/productRoutes.js"
import reviewRoutes from "./reviewRoutes.js";
import cartRoutes from '../routes/cartRoutes.js'
import orderRoutes from "./orderRoutes.js";
import addressRouter from "./addressRoutes.js";


const router = express.Router()

router.use("/auth", authRoutes);
router.use("/product", productRoutes )
router.use("/reviews", reviewRoutes )
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes)
router.use("/address", addressRouter)




export default router