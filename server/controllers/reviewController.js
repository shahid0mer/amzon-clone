import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { productId, rating, title, comment, images } = req.body;
    const userId = req.user._id;

    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) return res.status(400).json({ message: "You already reviewed this product" });

    const newReview = await Review.create({
      product: productId,
      user: userId,
      rating,
      title,
      comment,
      images,
      verified: true 
    });

    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};