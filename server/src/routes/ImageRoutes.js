const express = require("express");
const upload = require("../services/imgUpload");
const aws = require("aws-sdk");
const s3 = new aws.S3();
const verifyAdmin = require("../util/verifyToken");
const ImageModel = require("../models/images");

const CLOUDFRONT = "d1tjf70w3r56al.cloudfront.net";

aws.config.update({
  secretAccessKey: process.env.AWS_USER_SECRET_KEY,
  accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
  region: "ca-central-1"
});

const singleUpload = upload.single("image");

const initializeImageRoutes = app => {
  const imageRouter = express.Router();
  app.use("/image", imageRouter);

  /* Post an image to AWS S3 */
  imageRouter.post("/s3", verifyAdmin, (req, res) => {
    singleUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "File Upload Error", detail: err.message }]
        });
      }
      return res.json({ imageUrl: `${CLOUDFRONT}/${req.file.key}` });
    });
  });

  /* Remove an image from AWS S3 */
  imageRouter.delete("/s3/:id", verifyAdmin, (req, res) => {
    const params = {
      Bucket: "anatomy-bucket",
      Key: req.params.id
    };

    s3.deleteObject(params, function(err, data) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "File Deletion Error", detail: err.message }]
        });
      }
      return res.json("Deletion Successful!");
    });
  });

  /* Post an image to Mongo */
  imageRouter.post("/", verifyAdmin, async (req, res) => {
    const image = new ImageModel(req.body);
    if (!image.imageUrl || !image.region) {
      return res.status(400).send("Please pass appropriate body");
    }
    try {
      await image.save().then(item => res.send(item));
    } catch (e) {
      res.status(400).send(`Could not create the image for ${e.message}`);
    }
  });

  /* get all the images or by query from Mongo */
  imageRouter.get("/", async (req, res) => {
    try {
      const images = await ImageModel.find(req.query);
      if (images === null || images.length === 0) {
        res.status(404).send(`No images found`);
      } else {
        res.status(200);
        res.json(images);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the images with query ${req.query} for ${e.message}`
        );
    }
  });

  /* remove a iamge with the id */
  imageRouter.delete("/:id", verifyAdmin, async (req, res) => {
    const id = req.params.id.trim();
    try {
      const image = await ImageModel.findByIdAndDelete(id);
      if (image === null) {
        res.status(404).send(`No image found with id ${req.params.id}`);
      } else {
        res.status(200).send(`removed the iamge with id ${id}`);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not remove the image with id ${req.params.id} for ${e.message}`
        );
    }
  });
};

module.exports = initializeImageRoutes;
