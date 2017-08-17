exports.handleErrors = () => async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.error(`﴾͡๏̯͡๏﴿ O'RLY?`, error)
    const { message = 'Internal Server Error', stack, status, statusCode, httpCode } = error
    const code = status || statusCode || httpCode || 500

    ctx.set('Message', message)
    ctx.status = code
    ctx.body = {
      httpCode: code,
      message,
      ...error,
      stack: process.env.NODE_ENV === 'development' ? stack : undefined
    }
  }
}
