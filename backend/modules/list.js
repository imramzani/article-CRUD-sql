const {Post} = require('../models')


module.exports = async function(req, res, next){
  const {limit, offset, status} = req.query
  let option = {
    limit: limit || 10,
    offset: offset || 0,
    attributes: {
      exclude: ['id','createdAt', 'updatedAt', 'created_date', 'updated_date']
    }
  }
  if(status) option.where.status = status
  try {
    const articles = await Post.findAndCountAll(option)
    if(articles.rows.length < 1) throw ({name: 'articleNotFound' })
    res.status(200).json({
      data: articles.rows,
      success: true,
      code: 200
    })
  } catch (err) {
    console.log(err)
  }
}