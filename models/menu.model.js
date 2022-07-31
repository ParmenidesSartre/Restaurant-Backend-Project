const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 5,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

/**
 * Check if menu with same name exist
 * @param {string} name - The menu's name
 * @returns {Promise<boolean>}
 */
menuSchema.statics.isMenuExist = async (name) => {
  const menu = await Menu.findOne({ name });
  return !!menu;
};

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
