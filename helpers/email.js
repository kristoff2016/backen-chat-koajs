const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport(
  {
    service: 'Gmail',
    auth: {
      user: 'brainmusic2017@gmail.com',
      pass: '098355644'
    },
    debug: true
  },
  {
    from: 'Brain Music brainmusic2017@gmail.com',
    headers: {
      'X-Laziness-level': 1000
    }
  }
)
module.exports = { transport }
