const http = require('http')
const { Pool } = require('pg')

const hostname = '0.0.0.0'
const port = 5000

const db_credentials = {
    user: 'admin',
    host: '172.17.0.1',
    password: '123456',
    port: 5432
}

async function poolDemo() {
    const pool = new Pool(db_credentials)
    const now = await pool.query('SELECT NOW()')
    const version = await pool.query('SELECT version()')

    await pool.end()
    return {now, version}
}

const server = http.createServer()

server.on('request', async(req, res) => {
    res.statusCode = 200

    const poolResult = await poolDemo()


    res.setHeader('Content-Type', 'text/plain')
    res.end(`
        Hello World,
        database time: ${new Date(poolResult.now.rows[0].now).toLocaleString()},
        database version: ${poolResult.version.rows[0].version}
    `)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})