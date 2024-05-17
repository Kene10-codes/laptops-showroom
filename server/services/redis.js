const util = require('util')
const { createClient } = require('redis')
const client = createClient('redis://192.168.0.1:8080')

module.exports.getCacheData = async function (req, res) {
    client.get = util.promisify(client.get)

    const cachedItem = await client.get(req.user.id)

    if (cachedItem) {
        res.status(200).json({ message: cachedItem })
        return cachedItem
    }
}
