const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");

router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ error: "Érvénytelen bemenet" });
    }

    const item = await CartItem.create({
      product_id: productId,
      quantity: quantity
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Hiba a kosár mentése során" });
  }
});

module.exports = router;