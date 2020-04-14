const express = require("express");
const ContributorModel = require("../models/contributor");
const verifyAdmin = require("../util/verifyToken");

const initializeContributorRoutes = app => {
  const contributorRouter = express.Router();
  app.use("/contributor", contributorRouter);

  /* create a contributor */
  contributorRouter.post("/", verifyAdmin, async (req, res) => {
    const contributor = new ContributorModel(req.body);
    try {
      await contributor.save().then(item => res.send(item));
    } catch (e) {
      res.status(400).send(`Could not create the contributor for ${e.message}`);
    }
  });


  /* get all the contributors or by query */
  contributorRouter.get("/", async (req, res) => {
    try {
      const contributors = await ContributorModel.find(req.query);
      if (contributors === null || contributors.length === 0) {
        res.status(404).send(`No such contributors found`);
      } else {
        res.status(200);
        res.json(contributors);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the contributors with query ${req.query} for ${e.message}`
        );
    }
  });

  /* remove a contributor with the id */
  contributorRouter.delete("/:id", verifyAdmin,  async (req, res) => {
    const id = req.params.id.trim();
    try {
      const contributor = await ContributorModel.findOneAndRemove({ _id: id });
      if (contributor === null || contributor.length === 0) {
        res.status(404).send(`No contributor found with id ${req.params.id}`);
      } else {
        res.status(200).send(`removed the contributor with id ${id}`);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not remove the contributor with id ${req.params.id} for ${e.message}`
        );
    }
  });
};

module.exports = initializeContributorRoutes;
