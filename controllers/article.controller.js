const db = require('../models');
const crypto = require('crypto');

const Article = db.article;

function create(req, res) {
  const id = crypto.randomBytes(10).toString('hex');

  Article.create({ id,...req.body })
    .then((data) => {
      res.status(200).json({
        status: true,
        message: 'new article created',
        article: data
      })
    })
    .catch((err) => {
      res.status(422).json({
        status: false,
        err
      })
    })
}

function findAll(_, res) {
  Article.findAll()
    .then((articles) => {
      if (articles.length == 0) {
        return res.status(200).json({
          status: false,
          message: 'no articles exist',
          articles
        })
      }
      return res.status(200).json({
        status: true,
        message: 'grabbed all articles',
        articles
      })
    })
    .catch((err) => res.status(422).json({
      status: false,
      err
    }))
}

function findByCategory(req, res) {
  const { category } = req.query;
  Article.findAll({
    where: {
      category: category.toLowerCase(),
    }
  })
    .then((articles) => {
      if (articles.length == 0) {
        return res.status(200).json({
          status: false,
          message: `no articles exist in ${category}`,
          articles
        })
      }
      return res.status(200).json({
        status: true,
        message: `grabbed all articles from ${category}`,
        articles
      })
    })
    .catch((err) => res.status(422).json({
      status: false,
      err
    }))
}

function findOne(req, res) {
  const { id } = req.params;
  Article.findByPk(id, {
    include: 'comments',
  })
    .then((article) => {
      if (article == null) {
        return res.status(404).json({
          status: false,
          message: 'article not found',
          article
        });
      }
      return res.status(200).json({
        status: true,
        message: 'grabbed one article',
        article
      });
    })
    .catch((err) => res.status(422).json({
      status: false,
      err
    }))
}

function _delete(req, res) {
  const { id } = req.params;
  Article.destroy({
    where: { id }
  })
    .then((num) => {
      if (num == 0) {
        return res.status(404).json({
          status: false,
          message: 'article not found for deletion',
        });
      }
      res.status(200).json({
        status: true,
        message: 'deleted one article',
      });
    })
    .catch((err) => res.status(422).json({
      status: false,
      err
    }))
}

module.exports = {
  create,
  findAll,
  findByCategory,
  findOne,
  delete: _delete,
};