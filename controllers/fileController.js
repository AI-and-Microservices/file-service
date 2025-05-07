const File = require('../models/File');
const logger = require('../utils/logger');

exports.uploadFile = async (req, res) => {
  try {
    const key = `userUpload_${req.user._id}`;

    const uploadedFile = req.file

    if (!uploadedFile) return res.error('Missing or invalid file-param: file', 400);

    const file = new File({
      _id: uploadedFile._id,
      key,
      origin: uploadedFile.location,
      name: uploadedFile.originalname,
      mimetype: uploadedFile.mimetype,
      ext: uploadedFile.ext,
      size: uploadedFile.size,
    })

    file.url = file.genUrl()
    file.save()

    return res.success(file)
  } catch (error) {
    return res.error(error, 400);
  }
};

exports.getFiles = async (req, res) => {
  try {
    const limit = req.getParams('limit', 12)
    const offset = req.getParams('offset', 0)
    const key = req.getParams('key', '')

    const query = {
      status: {
        $ne: File.STATUS.DELETED,
      },
      key,
    }

    const data = await File.find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .skip(offset)
    .lean()

    return res.success(data)
  } catch (error) {
    return res.error(error, 400);
  }
}

exports.delete = async (req, res) => {
  try {
    const _id = req.getParams('_id')
    const key = req.getParams('key', '')

    await File.updateMany(
      {
        _id: {
          $in: _id.split(','),
        },
        key,
      },
      {
        status: File.STATUS.DELETED,
      },
    )

    return res.success()
  } catch (error) {
    return res.error(error, 400);
  }
}