const express = require('express')
const app = express()
const path = require('path')
const opn = require('opn')
const os = require('os')
const portfinder = require('portfinder')

function getIPAddress (res) {
  const interfaces = os.networkInterfaces()
  Object.keys(interfaces).forEach(key => {
    const filter = interfaces[key].filter(alias => alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
    if (filter && filter.length)res = filter[0]
  })
  return res.address || 'localhost'
}

app.use(express.static(path.join(__dirname, '/dist')))

portfinder.basePort = process.env.PORT || 3366

portfinder.getPort((err, port) => {
  console.log('getPort')
  if (err) {
    console.err(err)
  } else {
    process.env.PORT = port
    app.listen(port, () => {
      const page = `http://${getIPAddress()}:${port}`
      opn(page)
    })
  }
})