const express = require("express");
const AdminModel = require("../models/admins");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../util/verifyToken");
const generateToken = require("../util/generateToken");
const refreshTokenService = require("../services/refreshTokenService");

const initializeAdminRoutes = app => {
  const adminRouter = express.Router();
  app.use("/admin", adminRouter);

  /* delete an admin by id */
  adminRouter.delete("/:id", verifyAdmin, async (req, res, next) => {
    const id = req.params.id.trim();
    try {
      const count = await AdminModel.countDocuments();
      if (count === 1) {
        return res
          .status(400)
          .send(
            "Can not remove the last admin. We need at least one admin in the DB"
          );
      }
      const admin = await AdminModel.findByIdAndDelete(id);
      if (admin === null || admin.length === 0) {
        return res.status(404).send(`No admin found with id ${id}`);
      } else {
        res.status(200).send(`removed the admin with id ${id}`);
      }
    } catch (e) {
      console.error(e);
      return next(e);
    }
  });

  /* delete an admin by email (query) */
  adminRouter.delete("/", verifyAdmin, async (req, res) => {
    const email = req.query.email;
    if (!email) {
      res
        .status(400)
        .send(
          "Please pass email of the admin that you want to remove as a query param"
        );
    }
    try {
      const count = await AdminModel.countDocuments();
      if (count === 1) {
        return res
          .status(400)
          .send(
            "Can not remove the last admin. We need at least one admin in the DB"
          );
      }

      const admin = await AdminModel.findOneAndRemove({ email: email });
      if (admin === null || admin.length === 0) {
        res
          .status(404)
          .send(`No such admin found with the email address ${email}`);
      } else {
        res.status(200).send(`removed the admin with email address ${email}`);
      }
    } catch (e) {
      res.status(500).send(`Could not delete admin for ${e.message}`);
    }
  });

  /* login an admin */
  adminRouter.post("/login", async (req, res) => {
    //Check if email exists
    const admin = await AdminModel.findOne({ email: req.body.email });
    if (!admin) return res.status(400).send(`User does not exist`);

    //Check if the password is right
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) return res.status(400).send(`Invalid Password`);

    //Create and assign a token
    const accessToken = generateToken(admin);
    const refreshToken = jwt.sign(
      { _id: admin._id, name: admin.name },
      process.env.REFRESH_TOKEN_SECRET
    );

    const uploadToken = await refreshTokenService.uploadToken(refreshToken);

    if (uploadToken) {
      res.json({ accessToken, refreshToken });
    } else {
      res.status(500).send("Please try again");
    }
  });

  /* logout an admin */
  adminRouter.post("/logout", verifyAdmin, async (req, res) => {
    if (!req.body.refreshToken) {
      return res.status(403).send("Pass refreshToken in the req body");
    }
    const refreshToken = req.body.refreshToken.trim();
    const deleteToken = await refreshTokenService.deleteToken(refreshToken);

    if (!deleteToken) {
      return res.status(500).send("Internal server error");
    } else {
      return res.status(200).send("Logged out successfully");
    }
  });

  /* get new token using the refreshToken */
  adminRouter.post("/refreshToken", async (req, res) => {
    if (!req.body.refreshToken) {
      res.status(403).send("Pass refreshToken in the req body");
    }

    const refreshToken = req.body.refreshToken.trim();

    //check if the token exists in DB
    const tokenExists = await refreshTokenService.findToken(refreshToken);
    if (tokenExists) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, admin) => {
          if (err) {
            res.status(403).send(err);
          } else {
            const accessToken = generateToken(admin);
            res.send({ accessToken });
          }
        }
      );
    }
  });
};

module.exports = initializeAdminRoutes;
