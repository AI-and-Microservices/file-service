const multer = require('multer')
const multerS3 = require('multer-s3')
const mongoose = require('mongoose')
const slugify = require('slugify')
const s3 = require('./s3')

const factory = {}

factory.storage = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: process.env.S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,

    key: (req, file, done) => {
      const _id = new mongoose.Types.ObjectId()
      const ext = file.originalname.includes('.')
        ? file.originalname.split('.').pop()
        : ''
      const name = slugify(file.originalname.slice(0, -ext.length - 1), {
        strict: true,
      })

      file._id = _id
      file.ext = ext

      let key = `${_id}-${name}`

      if (ext) {
        key += `.${ext}`
      }

      done(null, key)
    },
  }),
})

module.exports = factory
