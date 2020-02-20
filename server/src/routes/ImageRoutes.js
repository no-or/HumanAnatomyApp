const express = require("express");
const upload = require("../services/imgUpload");

const singleUpload = upload.single('image');

const initializeImageRoutes = (app) => {
    const imageRouter = express.Router();
    app.use('/image', imageRouter);

    /* create an image */
    imageRouter.post('/', (req, res) => {
        singleUpload(req, res, function(err) {
            if (err) {
                return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
            }
            return res.json({'imageUrl': req.file.location});
        });
    });
};

module.exports = initializeImageRoutes;
