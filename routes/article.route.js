const router = require('express').Router();
const article = require('../controllers/article.controller');

router.get('/index', article.findAll);

router.get('/search', article.findByCategory);

router.get('/show/:id', article.findOne);

router.post('/store', article.create);

router.delete('/destroy/:id', article.delete);

module.exports = router;