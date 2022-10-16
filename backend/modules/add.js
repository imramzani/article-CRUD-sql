const {Post} = require('../models')


module.exports = async function(req, res, next){
  const {title, content, category, status} = req.body
  let dataToInput = {
    title,
    content,
    category,
    status,
    created_date: new Date(),
    updated_date: new Date(),
  }
  try {
    const article = await Post.create(dataToInput)
    console.log(article)
    if(!article) throw {name: "addFail"}
    res.status(201).json({
      msg: 'success add data',
      success: true,
      code: 201
    })
  } catch (err) {
    next(err)
  }
}