const db = require('../models');
const crypto = require('crypto');

const Comment = db.comment;
const Article = db.article;

async function create(req, res) {
  const id = crypto.randomBytes(10).toString('hex');
  const article = await Article.findByPk(req.body.articleId);

  if (article == null) {
    return res.status(404).json({
      status: false,
      message: 'cannot refer to null article',
    })
  }

  Comment.create({ id,...req.body })
    .then((data) => res.status(200).json({
      status: true,
      message: 'new comment added',
      comment: data
    }))
    .catch((err) => res.status(422).json({
      status: false,
      err
    }))
}

function _delete(req, res) {
  const { id } = req.params;
  Comment.destroy({
    where: { id }
  })
    .then((num) => {
      if (num == 0) {
        return res.status(404).json({
          status: false,
          message: 'comment not found for deletion',
        });
      }
      res.status(200).json({
        status: true,
        message: 'deleted one comment',
      });
    })
    .catch((err) => res.status(422).json({
      status: false,
      err
    }))
}

module.exports = {
  create,
  delete: _delete,
};