const express = require("express");
const router = express.Router();
const Pantry = require("../models/pantry");

router.post("/", (req, res) => {
  Pantry.findOne({ name: req.body.name }, (err, recipe) => {
    if (recipe) {
      res.json({ type: "error", message: "Item already exists in database!" });
    } else {
      let pantry = new Pantry({
        user_id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
        image: req.body.image
      });
      pantry.save((err, pantry) => {
        if (err) {
          res.json({
            type: "error",
            message: "Database Error creating Pantry."
          });
        } else {
          res.json(pantry);
        }
      });
    }
  });
});

router.get("/:id", (req, res) => {
  Pantry.find({ user_id: req.params.id }, (err, items) => {
    if (!err) {
      res.status(200).json(items);
    } else {
      res.status(500).json({ err });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Pantry.deleteOne({ _id: req.params.id }, err => {});
});

module.exports = router;
