const express = require("express");
const AdminModel = require("../models/admins");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../util/verifyToken");

const ValidationSchema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    authorizedBy: Joi.string().min(6).required()
});

const initializeAdminRoutes = (app) => {
    const adminRouter = express.Router();
    app.use('/admin', adminRouter);

    /* create an admin */
    adminRouter.post('/register', async (req, res) => {
        const {error} = ValidationSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const authByAdmin = await AdminModel.findOne({name:req.body.authorizedBy});
        if(!authByAdmin) return res.status(400).send(`We do not recognize ${req.body.authorizedBy}`);

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const admin = new AdminModel(req.body);
        try {
            await admin.save().then((item) => res.send(item));
        } catch (e) {
            res.status(400).send(e.message);
        }
    });

    /* delete an admin by id */
    adminRouter.delete('/:id', verifyAdmin,  async (req, res, next) => {
        const id = req.params.id.trim();
        try {
            const count = await AdminModel.countDocuments();
            if(count === 1) {
                return res.status(400).send('Can not remove the last admin. We need at least one admin in the DB');
            }
            const admin = await AdminModel.findByIdAndDelete(id);
            if (admin === null || admin.length === 0) {
                return res.status(404).send(`No admin found with id ${id}`);
            } else {
                res.status(200).send(`removed the admin with id ${id}`);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* delete an admin by email (query) */
    adminRouter.delete('/', verifyAdmin,  async (req, res) => {
        const email = req.query.email;
        if(!email) {
            res.status(400).send('Please pass email of the admin that you want to remove as a query param');
        }
        try {
            const count = await AdminModel.countDocuments();
            if(count === 1) {
                return res.status(400).send('Can not remove the last admin. We need at least one admin in the DB');
            }

            const admin = await AdminModel.findOneAndRemove({email: email});
            if (admin === null || admin.length === 0) {
                res.status(404).send(`No such admin found with the email address ${email}`);
            } else {
                res.status(200).send(`removed the admin with email address ${email}`);
            }
        } catch (e) {
            res.status(500).send(`Could not delete admin for ${e.message}`);
        }
    });

    /* login */
    adminRouter.post('/login', async (req, res) => {
        //Check if email exists
        const admin = await AdminModel.findOne({email:req.body.email});
        if(!admin) return res.status(400).send(`User does not exist`);

        //Check if the password is right
        const validPass = await bcrypt.compare(req.body.password, admin.password);
        if(!validPass) return res.status(400).send(`Invalid Password`);

        //Create and assign a token
        const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(`Logged in!`);
    });
};

module.exports = initializeAdminRoutes;
