const {Post} = require('../models')


module.exports = async function(req, res, next){
  const {id} = req.params
  let data = {
    status: "Trash"
  }
  let option = {
    where: {
      id: id
    }
  }
  try {
    const article = await Post.findOne(option)
    if(!article) throw({name: 'productNotFound' })
    console.log(article)
    await Post.update(data, option)
    res.status(200).json({
      success: true,
      code: 200,
      msg: 'Success delete article'
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}