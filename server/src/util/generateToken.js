const jwt = require("jsonwebtoken");

module.exports = function(admin) {
  return jwt.sign(
    { _id: admin._id, name: admin.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
};
