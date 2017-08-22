exports.singleImageUploader = async ctx => {
  const hostname = ctx.headers.host
  const { file } = ctx.req
  const { filename } = file
  ctx.body = { url: 'http://localhost:5000/storage/images/' + filename }
}

exports.singleVideoUploader = async ctx => {
  const hostname = ctx.headers.host
  const { file } = ctx.req
  const { filename } = file
  ctx.body = { url: 'http://localhost:5000/storage/videos/' + filename }
}
