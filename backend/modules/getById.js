const {Post} = require('../models')


module.exports = async function(req, res, next){
  const {id} = req.params
  let option = {
    where: {
      id: id
    },
    attributes: {
      exclude: ['id','createdAt', 'updatedAt', 'created_date', 'updated_date']
    }
  }
  try {
    const article = await Post.findOne(option)
    if(!article) throw({name: 'articleNotFound' })
    console.log(article)
    res.status(200).json({
      data: article,
      success: true,
      code: 200
    })
  } catch (err) {
    next(err)
  }
}