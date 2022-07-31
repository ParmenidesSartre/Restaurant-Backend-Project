const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { multipleCloudinaryUpload } = require("../utils/cloudinaryUpload");
const { menuService } = require("../services");

const getAllMenus = catchAsync(async (req, res, next) => {
  // Check if req.query is empty
  if (Object.keys(req.query).length !== 0) {
    // Check if price range is correct
    if (req.query.price) {
      const priceRange = req.query.price.split("-");
      // If price range is not correct or not being parse correctly
      if (priceRange.length < 2) {
        return next(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Price range is not correct, please use format: min-max"
          )
        );
      }
      if (
        parseFloat(priceRange[0]) > parseFloat(priceRange[1]) ||
        priceRange.length > 2
      ) {
        return next(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Price range is not correct, please check your query"
          )
        );
      }
    }
    const menus = await menuService.filterMenu(req, next);
    return res.status(httpStatus.OK).send(menus);
  }
  // Get all menus from database
  const menus = await menuService.getAllMenus(req);
  res.status(httpStatus.OK).send(menus);
});

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
  res.status(httpStatus.OK).send(menu);
});

const deleteMenu = catchAsync(async (req, res) => {
  // Delete collection in database based on id
  const menu = await menuService.deleteMenu(req);
  res.status(httpStatus.OK).send(menu);
});

const filterMenu = catchAsync(async (req, res) => {
  // Filter collection in database based on id
  const menu = await menuService.filterMenu(req);
  res.status(httpStatus.OK).send(menu);
});

module.exports = {
  createMenu,
  updateMenu,
  deleteMenu,
  getAllMenus,
  filterMenu,
};
