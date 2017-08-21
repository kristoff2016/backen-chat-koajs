const multer = require('koa-multer')
const uuidV4 = require('uuid').v4
const { extension } = require('mime-types')
const { BadRequestError } = require('../../helpers/httpError')

exports.isMultiPart = async (ctx, next) => {
  if (ctx.request.type !== 'multipart/form-data') {
    throw new BadRequestError(`Only request type of 'multipart/form-data' is allowed`)
  }
  await next()
}

exports.singleUpload = async (ctx, next) => {
  try {
    await multerUpload.single('file')(ctx)
    const { file } = ctx.req
    if (!file) {
      throw new BadRequestError('A file is required!')
    }
  } catch ({ code: reason, message }) {
    throw new BadRequestError(message)
  }
  await next()
}

exports.singleVideoUpload = async (ctx, next) => {
  try {
    await multerVideoUpload.single('file')(ctx)
    const { file } = ctx.req
    if (!file) {
      throw new BadRequestError('A file is required!')
    }
  } catch ({ code: reason, message }) {
    throw new BadRequestError(message)
  }
  await next()
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/storage/images'),
  filename: (req, file, cb) => cb(null, `${uuidV4().replace(/-/g, '')}.${extension(file.mimetype)}`)
})

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/storage/videos'),
  filename: (req, file, cb) => cb(null, `${uuidV4().replace(/-/g, '')}.${extension(file.mimetype)}`)
})

/**
 * limits - object - Various limits on incoming data. Valid properties are:
 * - fieldNameSize - integer - Max field name size (in bytes) (Default: 100 bytes).
 * - fieldSize - integer - Max field value size (in bytes) (Default: 1MB).
 * - fields - integer - Max number of non-file fields (Default: Infinity).
 * - fileSize - integer - For multipart forms, the max file size (in bytes) (Default: Infinity).
 * - files - integer - For multipart forms, the max number of file fields (Default: Infinity).
 * - parts - integer - For multipart forms, the max number of parts (fields + files) (Default: Infinity).
 * - headerPairs - integer - For multipart forms, the max number of header key=>value pairs to parse Default: 2000 (same as node's http).
 */

const limits = {
  fileSize: 5000000, // 1 megabyte = 1000000 bytes
  files: 5
}

const supportedFileTypes = [ 'image/jpeg', 'image/png', 'image/gif' ]
const supportedVideoFileTypes = [ 'video/mp4' ]
// Create a new object, that prototypically inherits from the Error constructor
function UnsupportedFileTypeError (message) {
  this.name = 'UnsupportedFileTypeError'
  this.message = message || 'Unsupported file type'
  this.code = 'UNSUPPORTED_FILE_TYPE'
  this.stack = new Error().stack
}
UnsupportedFileTypeError.prototype = Object.create(Error.prototype)
UnsupportedFileTypeError.prototype.constructor = UnsupportedFileTypeError

/**
 * // The function should call `cb` with a boolean
 * // to indicate if the file should be accepted
 * // To reject this file pass `false`, like so:
 * cb(null, false)
 * // To accept the file pass `true`, like so:
 * cb(null, true)
 * // You can always pass an error if something goes wrong:
 * cb(new Error('I don\'t have a clue!'))
 */
const fileFilter = (req, file, cb) => {
  return supportedFileTypes.includes(file.mimetype) ? cb(null, true) : cb(new UnsupportedFileTypeError())
}

const videoFileFilter = (req, file, cb) => {
  return supportedVideoFileTypes.includes(file.mimetype) ? cb(null, true) : cb(new UnsupportedFileTypeError())
}
const multerUpload = multer({ storage, fileFilter, limits })
const multerVideoUpload = multer({ storage: videoStorage, fileFilter: videoFileFilter, limits })
