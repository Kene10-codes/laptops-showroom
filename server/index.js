const cluster = require('cluster') // IMPORT CLUSTER
const mongoose = require('mongoose') // IMPORT MONGOOSE
const app = require('./app') // IMPORT APP FILE

// SET PORT
const PORT = process.env.PORT || 3100

// DATABASE URL
const DB_CONNECT = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@nodetut.n6pqp.mongodb.net/techielaptops?retryWrites=true&w=majority`

if (cluster.isMaster) {
    // ENABLES CHILD PROCESS
    cluster.fork()
    cluster.fork()
} else {
    // START SERVER FUNCTION
    function startServer() {
        try {
            mongoose
                .connect(DB_CONNECT)
                .then(() => {
                    app.listen(PORT, () => console.log('app is running'))
                    console.log('DB is connected')
                })
                .catch((e) => console.log(e))
        } catch (e) {
            console.log(e.message)
        }
    }

    // INVOKE FUNC SERVER
    startServer()
}
