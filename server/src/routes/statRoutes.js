const express = require("express");
const StatModel = require("../models/stats");
const verifyAdmin = require("../util/verifyToken");

const initializeStatRoutes = app => {
  const statRouter = express.Router();
  app.use("/stat", statRouter);

  /* create a stat */
  statRouter.post("/", async (req, res) => {
    const stat = new StatModel(req.body);
    try {
      await stat.save().then(item => res.send(item));
    } catch (e) {
      res.status(500).send(`Could not create the stat for ${e.message}`);
    }
  });

  /* get all the stats or by query */
  statRouter.get("/", verifyAdmin, async (req, res) => {
    try {
      const stats = await StatModel.find(req.query);
      if (stats === null || stats.length === 0) {
        res.status(404).send(`There are currently no stats in the DB`);
      } else {
        res.status(200);
        res.json(stats);
      }
    } catch (e) {
      res.status(500).send(`Could not get the stat for ${e.message}`);
    }
  });
};

module.exports = initializeStatRoutes;
