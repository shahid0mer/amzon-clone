import Product from "../models/Product.js";

// GET ALL PRODUCTS (Search + Filter + Pagination)
export const getProducts = async (req, res) => {
  try {
    const { 
      search, 
      category, 
      brand, 
      minPrice, 
      maxPrice, 
      sort, 
      page = 1, 
      limit = 12 
    } = req.query;

    const query = { isActive: true };

    // 🔍 Search (Text Index)
    if (search) {
      query.$text = { $search: search };
    }

    // 🎯 Category Filter
    if (category) query.category = category;

    // 🎯 Brand Filter
    if (brand) {
      const brands = brand.split(',').map(b => b.trim());
      query.brand = { $in: brands };
    }

    // if (req.query.rating) {
    // query.rating = { $gte: Number(req.query.rating) };
    // } 

    if (req.query.rating) {
  query['rating.average'] = { $gte: Number(req.query.rating) };
}

    // 💰 Price Range Filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    // ⏳ Sorting
    let sortOption = {};
    if (sort) {
      sortOption[sort] = sort.startsWith("-") ? -1 : 1;
    } else {
      sortOption.createdAt = -1; // default sorting: newest first
    }

    // Fetch products
    const products = await Product.find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort(sortOption);

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      products,
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// GET SINGLE PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    return res.status(200).json({ success: true, product });

  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};


// export const getAllProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;  // current page
//     const limit = parseInt(req.query.limit) || 20; // items per page
//     const skip = (page - 1) * limit;

//     // Fetch only the products for the current page
//     const products = await Product.find({})
//       .skip(skip)
//       .limit(limit);

//     // Total number of products for pagination
//     const total = await Product.countDocuments();

//     res.status(200).json({
//       success: true,
//       products,
//       page,
//       pages: Math.ceil(total / limit),
//       total,
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// GET PRODUCTS BY CATEGORY
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const { 
      page = 1, 
      limit = 12,
      sort,
      minPrice,
      maxPrice,
      brand
    } = req.query;

    const query = { 
      isActive: true,
      category: categoryName 
    };

    // 🎯 Brand Filter (optional)
    if (brand) query.brand = brand;

    // 💰 Price Range Filter (optional)
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    // ⏳ Sorting
    let sortOption = {};
    if (sort) {
      switch (sort) {
        case 'price-asc':
          sortOption.price = 1;
          break;
        case 'price-desc':
          sortOption.price = -1;
          break;
        case 'name-asc':
          sortOption.name = 1;
          break;
        case 'name-desc':
          sortOption.name = -1;
          break;
        default:
          sortOption.createdAt = -1;
      }
    } else {
      sortOption.createdAt = -1; // default: newest first
    }

    // Fetch products
    const products = await Product.find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort(sortOption);

    const total = await Product.countDocuments(query);

    // Return 404 if category has no products
    if (products.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `No products found in category: ${categoryName}` 
      });
    }

    return res.status(200).json({
      success: true,
      category: categoryName,
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
      products,
    });

  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};
