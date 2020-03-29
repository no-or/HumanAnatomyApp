const express = require("express");
const FlashcardModel = require("../models/flashcards");
const verifyAdmin = require("../util/verifyToken");

const initializeFlashcardRoutes = app => {
  const flashcardRouter = express.Router();
  app.use("/flashcard", flashcardRouter);

  /* create a flashcard */
  flashcardRouter.post("/", verifyAdmin, async (req, res) => {
    const flashcard = new FlashcardModel(req.body);
    try {
      await flashcard.save().then(item => res.send(item));
    } catch (e) {
      res.status(400).send(`Could not create the flashcard for ${e.message}`);
    }
  });

  /* get a flashcard with id */
  flashcardRouter.get("/:id", async (req, res) => {
    try {
      const flashcard = await FlashcardModel.findById(req.params.id);
      if (flashcard === null) {
        res.status(404).send(`No flashcard found with id ${req.params.id}`);
      } else {
        res.status(200).send(flashcard);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the quiz with id ${req.params.id} for ${e.message}`
        );
    }
  });

  /* get all the flashcards or by query */
  flashcardRouter.get("/", async (req, res) => {
    try {
      const flashcards = await FlashcardModel.find(req.query);
      if (flashcards === null || flashcards.length === 0) {
        res.status(404).send(`No such flashcards found`);
      } else {
        res.status(200);
        await res.json(flashcards);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the flashcards with query ${req.query} for ${e.message}`
        );
    }
  });

  /* remove a flashcard with the id */
  flashcardRouter.delete("/:id", verifyAdmin, async (req, res) => {
    const id = req.params.id.trim();
    try {
      const flashcard = await FlashcardModel.findByIdAndDelete(id);
      if (flashcard === null) {
        res.status(404).send(`No flashcard found with id ${req.params.id}`);
      } else {
        res.status(200).send(`removed the flashcard with id ${id}`);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not remove the flashcard with id ${req.params.id} for ${e.message}`
        );
    }
  });
};

module.exports = initializeFlashcardRoutes;
