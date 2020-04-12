const express = require("express");
const VideoModel = require("../models/videos");
const verifyAdmin = require("../util/verifyToken");

const initializeVideoRoutes = (app) => {
  const videoRouter = express.Router();
  app.use("/video", videoRouter);

  /* save a video entity to the DB */
  videoRouter.post("/", verifyAdmin, async (req, res) => {
    const video = new VideoModel(req.body);
    try {
      await video.save().then((item) => res.send(item));
    } catch (e) {
      res.status(400).send(`Could not create the video for ${e.message}`);
    }
  });

  /* get a video entity with id */
  videoRouter.get("/:id", async (req, res) => {
    try {
      const video = await VideoModel.findById(req.params.id);
      if (video === null) {
        res.status(404).send(`No video found with id ${req.params.id}`);
      } else {
        res.status(200).send(videos);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the video with id ${req.params.id} for ${e.message}`
        );
    }
  });

  /* get all the video entities or by query (region/link/title) */
  videoRouter.get("/", async (req, res) => {
    try {
      const videos = await VideoModel.find(req.query);
      if (videos === null || videos.length === 0) {
        res.status(404).send(`No such videos found`);
      } else {
        res.status(200).send(videos);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the videos with query ${req.query} for ${e.message}`
        );
    }
  });

  /* remove a video with the id */
  videoRouter.delete("/:id", verifyAdmin, async (req, res) => {
    const id = req.params.id.trim();
    try {
      const video = await VideoModel.findOneAndRemove({ _id: id });
      if (video === null) {
        res.status(404).send(`No video found with id ${req.params.id}`);
      } else {
        res.status(200).send(`removed the video with id ${id}`);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not remove the video with id ${req.params.id} for ${e.message}`
        );
    }
  });

  /* remove a video with the title (in the query) */
  videoRouter.delete("/", verifyAdmin, async (req, res) => {
    const title = req.query.title;
    if (!title) {
      res
        .status(400)
        .send(
          "Please pass title of the video that you want to remove as a query param"
        );
    }
    try {
      const video = await VideoModel.findOneAndRemove({ title: title });
      if (video === null) {
        res.status(404).send(`No video found with the title ${title}`);
      } else {
        res.status(200).send(`removed the video component with title ${title}`);
      }
    } catch (e) {
      res.status(500).send(`Could not delete the video for ${e.message}`);
    }
  });
};

module.exports = initializeVideoRoutes;
