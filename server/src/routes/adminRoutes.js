const express = require("express");
const AdminModel = require("../models/admins");

const initializeAdminRoutes = (app) => {
    const adminRouter = express.Router();
    app.use('/admin', adminRouter);

    /* create a admin */
    adminRouter.post('/register', async (req, res) => {
        const admin = new AdminModel(req.body);
        try {
            await admin.save().then((item) => res.send(item));
        } catch (e) {
            res.status(400).send(e);
        }
    });
};

module.exports = initializeAdminRoutes;
