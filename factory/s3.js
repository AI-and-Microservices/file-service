const { S3Client } = require('@aws-sdk/client-s3')

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },

  endpoint: process.env.ENDPOINT,
  forcePathStyle: true,
  region: process.env.REGION,
})

module.exports = s3
