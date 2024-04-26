const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 3100

const DB_CONNNCT = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@nodetut.n6pqp.mongodb.net/techielaptops?retryWrites=true&w=majority`

function startServer() {
    try {
        mongoose
            .connect(DB_CONNNCT)
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
