const { query } = require("express");
const httpStatus = require("http-status");
const { Menu } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a menu
 * @param {Object} data
 * @returns {Promise<Menu>}
 */
const createMenu = async (data) => {
  if (await Menu.isMenuExist(data.body.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Menu already exist");
  }
  return Menu.create(data.body);
};

/**
 * Update a menu
 * @param {Object} data
 * @returns {Promise<Menu>}
 */
const updateMenu = async (data) => {
  return Menu.findByIdAndUpdate(data.params._id, data.body, { new: true });
};

/**
 * Delete a menu
 * @param {Object} data
 * @returns{NULL}
 */
const deleteMenu = async (data) => {
  return Menu.findByIdAndDelete(data.params._id);
};

/**
 * Get all items in menu
 * @param {Object} data
 * @returns {Promise<Menu>}
 */
const getAllMenus = async (data) => {
  if (data.body.published) {
    return Menu.paginate({ published: true }, { page: query.page });
  }
  return Menu.paginate({}, { page: query.page });
};

/**
 * Get all items in menu but filtered
 * @param {Object} data
 * @returns {Promise<Menu>}
 * @description This function is used to filter the menu  according to price and popularity, sort by price and popularity accordinglys
 */

const filterMenu = async (data) => {
  const { price, popularity } = data.query;
  // If only price is provided
  if (!price) {
    return Menu.paginate(
      { popularity: { $gte: parseInt(popularity) } },
      { page: query.page }
    );
    // If only popularity is provided
  } else if (!popularity) {
    // Split price
    const priceRange = price.split("-");
    return Menu.paginate(
      {
        price: {
          $gte: parseFloat(priceRange[0]),
          $lte: parseFloat(priceRange[1]),
        },
      },
      { page: query.page }
    );
    // If both price and popularity are provided
  } else if (price && popularity) {
    // Split price
    const priceRange = price.split("-");
    return Menu.paginate(
      {
        popularity: { $gte: parseInt(popularity) },
        price: {
          $gte: parseFloat(priceRange[0]),
          $lte: parseFloat(priceRange[1]),
        },
      },
      { page: query.page }
    );
  }
  return Menu.paginate(data.query, { page: query.page });
};

module.exports = {
  createMenu,
  updateMenu,
  deleteMenu,
  getAllMenus,
  filterMenu,
};
