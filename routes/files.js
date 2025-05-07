const { Router } = require('express')
const controller = require('../controllers/fileController')
const factory = require('../factory')

const router = Router()

router.post('/', factory.storage.single('file'), controller.uploadFile)

router.get('/', controller.getFiles)

router.delete('/', controller.delete)

module.exports = router
