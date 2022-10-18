const {Post} = require('../models')
const {Op} = require('sequelize')

module.exports = async function(req, res, next){
  const {limit, offset, status} = req.query
  let option = {
    limit: limit || 10,
    offset: offset || 0,
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'created_date', 'updated_date']
    },
    where : { status : "Publish"}
  }
  if(status) option.where.status = status
  try {
    const articles = await Post.findAndCountAll(option)
    if(articles.rows.length < 1) throw ({name: 'articleNotFound' })
    res.status(200).json({
      data: articles.rows,
      count: articles.count,
      success: true,
      code: 200,
      limit: limit,
      offset: offset
    })
  } catch (err) {
    console.log(err)
  }
}