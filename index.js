const server = require('./lib/server')
const config = require('./config')
const { app: { port } } = config

server.listen(port, () => console.log(`Server running on port ${port}`))
