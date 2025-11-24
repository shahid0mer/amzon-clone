import express from "express";
import authRoutes from './authRoutes.js'

const userRouter = express.Router()


userRouter.use("/user", authRoutes)


export default userRouter