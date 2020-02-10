const express = require("express");
const CodeModel = require("../models/code");
const verifyAdmin = require("../util/verifyToken");

const initializeCodeRoutes = (app) => {
    const codeRouter = express.Router();
    app.use('/code', codeRouter);

    /* get the code */
    codeRouter.get('/', async (req, res) => {
        try {
            const code = await CodeModel.find();
            if (code === null) {
                res.status(404).send('No secret code found in the DB')
            } else {
                res.status(200);
                await res.json(code);
            }
        } catch (e) {
            res.status(500).send(e.message);
        }
    });

    /* modify the code */
    codeRouter.put('/', verifyAdmin, async (req, res) => {
        if(!req.body.code) {
            res.status(400).send('Please send the appropriate request body')
        }
        try {
            const code = await CodeModel.findOneAndUpdate(req.body);
            if (code === null) {
                res.status(404).send(`${req.body} is incorrect`)
            } else {
                await res.status(200);
                await res.json('The code has been modified');
            }
        } catch (e) {
            res.status(500).send(e.message);
        }
    });
};

module.exports = initializeCodeRoutes;