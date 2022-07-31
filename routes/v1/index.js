const express = require("express");
const menuRoute = require("./menu.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/menus",
    route: menuRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
