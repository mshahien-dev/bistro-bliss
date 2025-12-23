const express = require("express");
const Item = require("../models/item");
const auth = require("../middleware/auth");
const {
  getCache,
  setCache,
  delCache,
  clearItemsCache,
} = require("../utils/cache");
const router = new express.Router();

router.post("/items", auth, async (req, res) => {
  const item = new Item({
    ...req.body,
  });

  try {
    const categories = ["breakfast", "drinks", "mainDishes", "desserts"];
    const category = item.category;
    if (!categories.includes(category)) {
      return res.status(400).send({ error: "Invalid category!" });
    }
    await item.save();
    // Invalidate items list cache and single-item cache
    await clearItemsCache();
    try {
      await delCache(`item:${item._id}`);
    } catch (e) {
      console.error("Error deleting item cache:", e);
    }
    res.status(201).send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/items", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  const match = {};
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const cacheKey = `items:${JSON.stringify({
      category: req.query.category || "",
      page,
      limit,
      sortBy: req.query.sortBy || "",
    })}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).send(cached);

    const items = await Item.find({
      category: { $regex: req.query.category || "", $options: "i" },
    })
      .sort(sort)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .exec();

    // Cache the result for 60 seconds
    await setCache(cacheKey, items, 60);

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/items/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const cacheKey = `item:${_id}`;
    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).send(cached);

    const item = await Item.findOne({ _id });

    if (!item) {
      return res.status(404).send();
    }

    await setCache(cacheKey, item, 300);

    res.status(200).send(item);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/items/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "title", "price", "image", "category"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  try {
    const item = await Item.findOne({ _id: req.params.id });

    if (!item) {
      return res.status(404).send();
    }

    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    // Invalidate caches
    await clearItemsCache();
    try {
      await delCache(`item:${req.params.id}`);
    } catch (e) {
      console.error("Error deleting item cache:", e);
    }

    res.send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/items/:id", auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id });

    if (!item) {
      return res.status(404).send();
    }

    // Invalidate caches
    await clearItemsCache();
    try {
      await delCache(`item:${req.params.id}`);
    } catch (e) {
      console.error("Error deleting item cache:", e);
    }

    res.send(item);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
