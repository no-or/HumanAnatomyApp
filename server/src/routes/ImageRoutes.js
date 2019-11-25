const express = require("express");
const ImageModel = require("../models/images");

const initializeImageRoutes = (app) => {
    const imageRouter = express.Router();
    app.use('/image', imageRouter);

    /* create an image */
    imageRouter.post('/', async (req, res) => {
        const question = new ImageModel(req.body);
        try {
            await question.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not create the Image');
        }
    });

    /* get an image with id */
    imageRouter.get('/:id', async (req, res) => {
        try {
            const question = await ImageModel.findById(req.params.id);
            res.status(200);
            res.json(question);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not fetch the Image');
        }
    });
};

module.exports = initializeImageRoutes;
