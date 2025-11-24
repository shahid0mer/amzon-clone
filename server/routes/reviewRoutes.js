import express from'express'
import auth from '../middlewares/auth.js'
import { addReview, getProductReviews } from '../controllers/reviewController.js'

const reviewRouter = express.Router()

reviewRouter.post("/",auth, addReview)
reviewRouter.get("/:productId", getProductReviews)

export default reviewRouter