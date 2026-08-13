import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    discount: {
      type: String,
      default: "0%",
    },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    showOnHome: {
      type: Boolean,
      default: false,
    },

    bestSelling: {
      type: Boolean,
      default: false,
    },

    // YE PRODUCT KIS ADMIN NE ADD KIYA
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // Kitni baar update hua
    updatedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);