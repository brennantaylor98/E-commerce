const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');




router.get('/', async (req, res) => {
  // find all tags
  try {
      const tags = await Tag.findAll({
        include: [
          {
            model: Product,
          }
        ]
      });
      res.json(tags);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        }
      ]
    });
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
});

  router.post('/', async (req, res) => {
    // create a new tag
    try {
      const { tag_name } = req.body;
      const newTag = await Tag.create({
        tag_name
      });
      res.json(newTag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { tag_name } = req.body;
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      const updatedTag = await tag.update({
        tag_name
      });
      res.json(updatedTag);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.destroy();
      res.json({ message: 'Tag deleted' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
