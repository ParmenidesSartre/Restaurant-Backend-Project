const httpStatus = require("http-status");
const { Menu } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} data
 * @returns {Promise<User>}
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
 * @returns {Promise<User>}
 */
const updateMenu = async (data) => {
  return Menu.findByIdAndUpdate(data.params._id, data.body, { new: true });
};

module.exports = { createMenu, updateMenu };
