const express = require("express");
const FlashcardModel = require("../models/flashcards");

const initializeFlashcardRoutes = (app) => {
    const flashcardRouter = express.Router();
    app.use('/flashcard', flashcardRouter);

    /* create a flashCard */
    flashcardRouter.post('/', async (req, res) => {
        const question = new FlashcardModel(req.body);
        try {
            await question.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not create the FlashCard');
        }
    });

    /* get a flashCard with id */
    flashcardRouter.get('/:id', async (req, res) => {
        try {
            const question = await FlashcardModel.findById(req.params.id);
            res.status(200);
            res.json(question);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not fetch the Flashcard');
        }
    });
};

module.exports = initializeFlashcardRoutes;
