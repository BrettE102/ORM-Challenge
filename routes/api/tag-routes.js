const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name"],
    },
  })
  .then((tags) => res.json(tags))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id 
    },
    include: [Product]})
  // include its associated Product data
  .then((tag) => res.json(tag))
  .catch((err) => res.status(500).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({tag_name:req.body.tag_name}, {
    where: {
      id: req.params.id 
    },
  })
  .then((tag) => res.json(tag))
  .catch((err) => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  // delete a tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
  .then((tag) => res.json(tag))
});

module.exports = router;