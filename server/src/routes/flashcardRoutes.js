const express = require("express");
const FlashcardModel = require("../models/flashcards");
const verifyAdmin = require("../util/verifyToken");

const initializeFlashcardRoutes = (app) => {
    const flashcardRouter = express.Router();
    app.use('/flashcard', flashcardRouter);

    /* create a flashcard */
    flashcardRouter.post('/', verifyAdmin, async (req, res, next) => {
        const flashcard = new FlashcardModel(req.body);
        try {
            await flashcard.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* get a flashcard with id */
    flashcardRouter.get('/:id', async (req, res, next) => {
        try {
            const flashcard = await FlashcardModel.findById(req.params.id);
            if (flashcard === null) {
                throw new Error(`No flashcard found with id ${req.params.id}`);
            } else {
                res.status(200);
                await res.json(flashcard);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* get all the flashcards or by query*/
    flashcardRouter.get('/', async (req, res, next) => {
        try {
            const flashcards = await FlashcardModel.find(req.query);
            if (flashcards === null || flashcards.length === 0) {
                res.status(404).send(`No such flashcards found`);
            } else {
                res.status(200);
                await res.json(flashcards);
            }
        } catch (e) {
            console.error(e);
            res
        }
    });

    /* remove a flashcard with the id */
    flashcardRouter.delete('/:id', verifyAdmin,  async (req, res, next) => {
        const id = req.params.id.trim();
        try {
            const flashcard = await FlashcardModel.findByIdAndDelete(id);
            if (flashcard === null) {
                throw new Error(`No flashcard found with the id ${id}`);
            } else {
                res.status(200).send(`removed the flashcard with id ${id}`);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });
};

module.exports = initializeFlashcardRoutes;
