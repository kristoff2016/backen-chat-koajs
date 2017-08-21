exports.singleImageUploader = async ctx => {
  const hostname = ctx.headers.host
  const { file } = ctx.req
  console.log('ctx.req==', ctx.req)
  
  const { filename } = file
  ctx.body = { url: hostname + '/storage/images/' + filename }
}

exports.singleVideoUploader = async ctx => {
  const hostname = ctx.headers.host
  console.log('ctx.req==', ctx.req)
  const { file } = ctx.req
  const { filename } = file
  ctx.body = { url: hostname + '/storage/videos/' + filename }
}
