const mongoose = require('mongoose');

const Schema = mongoose.Schema

const STATUS = {
  ACTIVE: 'active',
  DELETED: 'deleted',
}

const schema = new Schema(
  {
    status: {
      type: String,
      default: STATUS.ACTIVE,
    },

    key: String,
    url: String,
    origin: String,
    name: String,
    mimetype: String,
    ext: String,
    size: Number,
    
  },
  {
    timestamps: true,
  },
)

schema.methods.genUrl = function () {
  if (this.mimetype.startsWith('image/')) {
    return this.origin.replace('http://minio/main/', process.env.BASE_IMAGE)
  }

  return this.origin.replace('http://minio/main/', process.env.BASE_FILE)
}

schema.statics.STATUS = STATUS

schema.index({ status: 1, key: 1 })

module.exports = mongoose.model('File', schema)
