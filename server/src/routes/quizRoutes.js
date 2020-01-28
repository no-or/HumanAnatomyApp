const express = require("express");
const QuizModel = require("../models/quizzes");

const initializeQuizRoutes = (app) => {
    const quizRouter = express.Router();
    app.use('/quiz', quizRouter);

    /* create a quiz */
    //TODO add auth
    quizRouter.post('/', async (req, res, next) => {
        const quiz = new QuizModel(req.body);
        try {
            await quiz.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* get a quiz with id */
    quizRouter.get('/:id', async (req, res, next) => {
        try {
            const quiz = await QuizModel.findById(req.params.id);
            if (quiz === null) {
                throw new Error(`No quiz found with id ${req.params.id}`);
            } else {
                res.status(200);
                await res.json(quiz);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* get all the quizzes or by query*/
    quizRouter.get('/', async (req, res, next) => {
        try {
            const quizzes = await QuizModel.find(req.query);
            if (quizzes === null) {
                throw new Error(`No quizzes found`);
            } else {
                res.status(200);
                await res.json(quizzes);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* remove a quiz with the id */
    //TODO add auth
    quizRouter.delete('/:id', async (req, res, next) => {
        const id = req.params.id.trim();
        try {
            const quiz = await QuizModel.findByIdAndDelete(id);
            if (quiz === null) {
                throw new Error(`No quiz found with the id ${id}`);
            } else {
                res.status(200);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });
};

module.exports = initializeQuizRoutes;
