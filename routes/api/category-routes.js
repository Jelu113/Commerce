const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const allCategories = await Category.findbyPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!allCategories) {
      res.status(404).json({ message: "No library card found with that id" });
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try{
    const locationData = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(locationData);
  }catch(err){
    res.status(400).json(err)
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const allCategories = await Category.destroy({
      where: {
        id:req.params.id,
      },
    });

    if(!allCategories){
      res.status(404).json({message: 'No library card found with that id!'});
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
