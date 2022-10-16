const express = require('express')
const getById = require('../modules/getById')
const router = express.Router()
const getList = require('../modules/list')
const addArticle = require('../modules/add')
const editArticle = require('../modules/edit')
const deleteArticle = require('../modules/delete')

router.get('/article', getList)
router.get('/article/:id', getById)
router.post('/article', addArticle)
router.post('/article/:id', editArticle)
router.delete('/article/:id', deleteArticle)

module.exports = router