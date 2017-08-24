const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
  cloud_name: 'dqgbojnjw',
  api_key: '718849549584692',
  api_secret: 'MwLp_MwKDmzcwcx5A9EgT3piHi8'
})

exports.singleImageUploader = async ctx => {
  const { file } = ctx.req
  const result = await cloudinary.uploader.upload(file.path)
  fs.unlinkSync(file.path)
  ctx.body = result
}

exports.singleVideoUploader = async ctx => {
  const { file } = ctx.req
  const result = await cloudinary.v2.uploader.upload(file.path, { resource_type: 'video' })
  fs.unlinkSync(file.path)
  ctx.body = result
}
