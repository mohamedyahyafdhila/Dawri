const { verifySignUp } = require("../middlewares");
const controller = require("../functions/auth.controller");
const controller1 = require("../functions/controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/auth", (req, res) => {
    res.json({ message: "Authentication ." });
});

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrPhoneNumber,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  //app.get("/api/rooms",controller1.roomGetAll);
  
};
