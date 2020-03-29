const express = require("express");
const CodeModel = require("../models/code");
const verifyAdmin = require("../util/verifyToken");
const bcrypt = require("bcryptjs");

const initializeCodeRoutes = app => {
  const codeRouter = express.Router();
  app.use("/code", codeRouter);

  /* get which admins have codes */
  codeRouter.get("/", verifyAdmin, async (req, res) => {
    try {
      const codes = await CodeModel.find();
      if (codes === null) {
        return res.status(404).send("No secret code found in the DB");
      } else {
        let admins = [];
        for (let code of codes) {
          admins.push({ admin: code.createdBy, createdOn: code.date });
        }
        res.status(200);
        res.json(admins);
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  /* post a secret code */
  codeRouter.post("/", verifyAdmin, async (req, res) => {
    if (!req.body.code) {
      return res.status(400).send("Please provide a code in the body");
    }

    if (!req.body.createdBy) {
      return res.status(400).send("Please send the appropriate request body");
    }

    const adminCode = await CodeModel.findOne({
      createdBy: req.body.createdBy
    });
    if (adminCode) {
      return res
        .status(400)
        .send(`Admin ${adminCode.createdBy} already have a secret code`);
    }

    //Hash the code
    const salt = await bcrypt.genSalt(11);
    req.body.code = await bcrypt.hash(req.body.code, salt);

    const code = new CodeModel(req.body);

    try {
      await code
        .save()
        .then(() =>
          res.send(
            "Secret code has been created successfully. Please note it down in a safe place"
          )
        );
    } catch (e) {
      res.status(500).send(`Could not create secret code for ${e.message}`);
    }
  });

  /* compare secret code */
  codeRouter.post("/compare", async (req, res) => {
    if (!req.body.authorizedBy) {
      return res.status(400).send("Please provide who has authorized you");
    }

    //Check if code exists under this admin
    const code = await CodeModel.findOne({ createdBy: req.body.authorizedBy });
    if (!code) {
      return res
        .status(401)
        .send(`We do not recognize ${req.body.authorizedBy}`);
    }

    //Check if the code is right
    const validCode = await bcrypt.compare(req.body.code, code.code);
    if (!validCode) {
      return res.status(401).send("Invalid Code");
    } else {
      return res.status(200).send("Success");
    }
  });

  /* remove a code by the admin */
  codeRouter.delete("/", verifyAdmin, async (req, res) => {
    if (!req.query.createdBy) {
      return res.status(400).send("Please pass createdBy as a query param");
    }
    try {
      const code = await CodeModel.findOneAndRemove({
        createdBy: req.query.createdBy
      });
      if (code === null) {
        return res
          .status(404)
          .send(`No code found for admin ${req.query.createdBy}`);
      } else {
        res
          .status(200)
          .send(`removed the secret code for admin ${req.query.createdBy}`);
      }
    } catch (e) {
      res.status(500).send(`Could not delete the code for ${e.message}`);
    }
  });
};

module.exports = initializeCodeRoutes;
