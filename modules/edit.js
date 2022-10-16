const {Post} = require('../models')


module.exports = async function(req, res, next){
  const {id} = req.params
  const {title, content, category, status} = req.body
  let dataToEdit = {
    title,
    content,
    category,
    status,
    updated_date: new Date(),
  }
  let option = {
    where: {
      id: id
    },
  }
  try {
    let article = await Post.findOne(option)
    if(!article) throw ({name: 'articleNotFound' })
    article = await Post.update(dataToEdit, option ) 
    res.status(201).json({
      success: true,
      code: 201,
      msg: 'Success edit article'

    })
  } catch (err) {
    next(err)
  }
}