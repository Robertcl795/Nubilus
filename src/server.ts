import express from 'express'

import Config from './config'

class Server {
    public app: express.Application
    private config: Config

    constructor() {
        this.app = express()
        this.config = new Config()
        this.setup()
    }

    setup() {
        this.app.set('port', this.config.port)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`This app is running on port ${this.app.get('port')}`)
        })
    }
}

const server = new Server()
server.start()