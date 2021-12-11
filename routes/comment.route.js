const router = require('express').Router();
const comment = require('../controllers/comment.controller');

router.post('/store', comment.create);

router.delete('/destroy/:id', comment.delete);

module.exports = router;