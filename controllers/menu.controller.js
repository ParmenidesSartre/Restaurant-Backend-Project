const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { multipleCloudinaryUpload } = require("../utils/cloudinaryUpload");
const { menuService } = require("../services");

const createMenu = catchAsync(async (req, res) => {
  // Upload image to cloudinary and get the url
  const modifiedReq = await multipleCloudinaryUpload(req, "menu");
  // Create collection in database
  const menu = await menuService.createMenu(modifiedReq);
  res.status(httpStatus.CREATED).send(menu);
});

const updateMenu = catchAsync(async (req, res) => {
  // Upload image to cloudinary and get the url
  const modifiedReq = await multipleCloudinaryUpload(req, "menu");
  // Update collection in database based on id
  const menu = await menuService.updateMenu(modifiedReq);
  res.status(httpStatus.CREATED).send(menu);
});

module.exports = { createMenu , updateMenu };
