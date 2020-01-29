const express = require("express");
const CodeModel = require("../models/code");

const initializeCodeRoutes = (app) => {
    const codeRouter = express.Router();
    app.use('/code', codeRouter);

    /* get the code */
    codeRouter.get('/', async (req, res) => {
        try {
            const code = await CodeModel.find();
            if (code === null) {
                throw new Error(`No code found`);
            } else {
                res.status(200);
                await res.json(code);
            }
        } catch (e) {
            res.status(500).send(e);
        }
    });

    /* modify the code */
    codeRouter.put('/', async (req, res) => {
        try {
            const code = await CodeModel.findOneAndUpdate(req.body);
            if (code === null) {
                throw new Error(`Could not update the secret code`);
            } else {
                await res.status(200);
                await res.json(`The code has been modified`);
            }
        } catch (e) {
            res.status(500).send(e);
        }
    });
};

module.exports = initializeCodeRoutes;