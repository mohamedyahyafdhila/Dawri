const { authJwt } = require("../middlewares");
const controller = require("../functions/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/proUser",
    [authJwt.verifyToken, authJwt.isProUser],
    controller.proUserBoard
  );
};
