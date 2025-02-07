const categories = require("../../models/categories");
const Products = require("../../models/products");
const fs = require("fs");
const path = require("path");
const {
  createUserSchema,
  updateUserSchema,
  UserProfileSchema,
} = require("../utils/validators/userValidators");
const {
  addProductSchema,
  updateProductSchema,
} = require("../utils/validators/productValidators");
const { Op } = require("sequelize");

//fuctions for categories
//create a new product category
async function createCategory(req, res) {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const item = await categories.create({
      name,
    });
    return res
      .status(201)
      .json({ message: "Category created successfully!", item });
  } catch (error) {
    console.error("Error creating Category:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Category already exists" });
    }

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

//get all categories
async function getCategories(req, res) {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await categories.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    // Pagination
    const totalPages = Math.ceil(count / limit);
    const paginationInfo = {
      totalCategories: count,
      totalPages: totalPages,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return res.status(200).json({
      message: "Categories displayed successfully!",
      pagination: paginationInfo,
      categories: rows,
    });
  } catch (error) {
    console.error("Error fetching Categories:", error);
    return res.status(500).json({
      message: "Error fetching Categories",
      error: error.message,
    });
  }
}

//functions for products
//add a new product
async function addProduct(req, res) {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    await addProductSchema.validate(req.body, { abortEarly: false });

    const { name, description, price, stock, category_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Prepare image details
    const imageName = file.filename;
    const image_url = `/uploads/${imageName}`;

    const category = await categories.findByPk(category_id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const product = await Products.create({
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
    });

    return res
      .status(201)
      .json({ message: "Product added successfully!", product });
  } catch (validationError) {
    // If validation error, delete the uploaded file
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting file:", err);
        } else {
          console.log("File deleted due to validation failure");
        }
      });
    }

    // validation error
    if (validationError.inner) {
      const validationErrors = validationError.inner.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res
        .status(400)
        .json({ message: "Validation error", errors: validationErrors });
    }

    return res.status(500).json({
      message: "Error adding Product",
      error: validationError.message,
    });
  }
}

//get all products with filters and pagination
async function getProducts(req, res) {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Filters from query params
    const { category_id, min_price, max_price, price } = req.query;

    // Build the filters object
    let filters = {};

    if (category_id) {
      const category = await categories.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      filters.category_id = category_id;
    }

    if (min_price || max_price) {
      filters.price = {};
      if (min_price) filters.price[Op.gte] = min_price;
      if (max_price) filters.price[Op.lte] = max_price;
    }
    //sorting by price
    let order = [];
    if (price) {
      order.push(["price", price.toLowerCase() === "asc" ? "ASC" : "DESC"]);
    }
    // Fetching filtered products with pagination
    const { count, rows } = await Products.findAndCountAll({
      where: filters,
      limit: limit,
      offset: offset,
      order: order,
    });

    // Pagination info
    const totalPages = Math.ceil(count / limit);
    const paginationInfo = {
      totalProducts: count,
      totalPages: totalPages,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return res.status(200).json({
      message: "Products displayed successfully!",
      pagination: paginationInfo,
      products: rows,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
}

//get specific product details
async function getProductById(req, res) {
  const productId = req.params.id;

  try {
    const product = await Products.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("product displayed successfully!");
    return res
      .status(201)
      .json({ message: "product displayed successfully!", product });
  } catch (error) {
    console.log("Error fetching product");
    return res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
}

//update a product
async function updateProduct(req, res) {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    await updateProductSchema.validate(req.body, { abortEarly: false });

    const { name, description, price, stock, category_id } = req.body;
    const file = req.file;
    const productId = req.params.id;

    // Fetch existing product details
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let image_url = product.image_url;

    if (file) {
      // If a new image uploaded, delete old image from the storage
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        product.image_url.split("/").pop()
      );

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log("Error deleting old image:", err);
        } else {
          console.log("Old image deleted successfully.");
        }
      });

      const imageName = file.filename;
      image_url = `/uploads/${imageName}`;
    }

    await product.update({
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
    });

    return res
      .status(200)
      .json({ message: "Product updated successfully!", product });
  } catch (validationError) {
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting file:", err);
        } else {
          console.log("File deleted due to validation failure");
        }
      });
    }

    // Handle validation error
    if (validationError.inner) {
      const validationErrors = validationError.inner.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res
        .status(400)
        .json({ message: "Validation error", errors: validationErrors });
    }

    return res.status(500).json({
      message: "Error updating Product",
      error: validationError.message,
    });
  }
}

//delete a product
async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const imagePath = path.join(
      __dirname,
      "../uploads",
      product.image_url.replace("/uploads/", "")
    );

    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("Image file deleted successfully");
        }
      });
    }

    await product.destroy();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createCategory,
  getCategories,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
