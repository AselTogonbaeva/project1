const path = require("path");
const express = require("express");
const multer = require('multer');

const {nanoid} = require('nanoid');
const config = require('../config');
const Product = require("../modals/Product");
const auth = require('../middleWare/auth');
const permit = require("../middleWare/permit");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const criteria = {};
    console.log(req.query)
    if (req.query.category) {
      criteria.category = req.query.category;
      console.log(req.query.category)
    }

    const products = await Product.find(criteria).populate('category', 'title')
    res.send(products);
  } catch (e) {
    res.sendStatus(500)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({_id: req.params.id}).populate('category', 'title');

    if (product) {
      res.send(product);
    } else {
      res.sendStatus(404);
    }

  } catch (e) {
    res.sendStatus(500);
  }

});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
  try {
    const productData = {
      category: req.body.category || null,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      productData.image = 'uploads/' + req.file.filename;
    }

    const product = new Product(productData);
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({_id: req.params.id});

    if (product) {
      res.send(product);
    } else {
      res.sendStatus(404);
    }

  } catch (e) {
    res.sendStatus(500);
  }

});


module.exports = router;