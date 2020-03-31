const express = require("express");
const VersionModel = require("../models/version");
const verifyAdmin = require("../util/verifyToken");

const initializeVersionRoutes = app => {
  const versionRouter = express.Router();
  app.use("/version", versionRouter);

  /* create a version */
  versionRouter.post("/", async (req, res) => {
    if (
      req.body.module !== "Flashcard" &&
      req.body.module !== "Quiz" &&
      req.body.module !== "Explore"
    )
      return res
        .status(400)
        .send("The value for module can only be Flashcard/Quiz/Explore");
    try {
      const findVersion = await VersionModel.findOne(req.body);
      if (findVersion)
        return res
          .status(400)
          .send("Similar data exists on DB; try updating instead");
      const version = new VersionModel(req.body);
      await version.save().then(item => res.send(item));
    } catch (e) {
      res
        .status(400)
        .send(`Could not create the version component for ${e.message}`);
    }
  });

  /* update a veriosn component */
  versionRouter.put("/", async (req, res) => {
    if (!req.body.module || !req.body.subRegion) {
      return res.status(400).send("Invalid request body");
    }
    try {
      const version = await VersionModel.findOneAndUpdate(
        req.body,
        { updatedOn: Date.now() },
        { new: true }
      );
      if (version === null || version.length === 0) {
        return res
          .status(404)
          .send("No such version component found in the DB");
      } else {
        res.status(200);
        res.json("Updated Sucessfully");
      }
    } catch (e) {
      res
        .status(400)
        .send(`Could not update the version component for ${e.message}`);
    }
  });

  /* get all the version or by query */
  versionRouter.get("/", async (req, res) => {
    try {
      const versions = await VersionModel.find(req.query);
      if (versions === null || versions.length === 0) {
        return res.status(404).send(`No such version component found`);
      } else {
        res.status(200);
        res.json(versions);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the versions with query ${req.query} for ${e.message}`
        );
    }
  });
};

module.exports = initializeVersionRoutes;
