const express = require("express");
const upload = require("../services/imgUpload");
const aws = require('aws-sdk');
const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_USER_SECRET_KEY,
    accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
    region: 'ca-central-1'
});

const singleUpload = upload.single('image');

const initializeImageRoutes = (app) => {
    const imageRouter = express.Router();
    app.use('/image', imageRouter);

    /* Post an image to AWS S3 */
    imageRouter.post('/', (req, res) => {
        singleUpload(req, res, function(err) {
            if (err) {
                return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
            }
            return res.json({'imageUrl': req.file.location});
        });
    });

    /* Remove an image from AWS S3 */
    imageRouter.delete('/:id', (req, res) => {
        const params = {
            Bucket: 'anatomy-bucket',
            Key: req.params.id,
        };

        s3.deleteObject(params, function(err, data) {
            if (err) {
                return res.status(422).send({errors: [{title: 'File Deletion Error', detail: err.message}] });
            }
            return res.json('Deletion Successful!');
        });
    });
};

module.exports = initializeImageRoutes;
