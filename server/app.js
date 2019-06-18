import express from 'express'
import path from 'path'
import graphqlHandler from './graphql/index'
import cors from 'cors'

const app = express()

const { SERVER_PORT } = process.env

const clientDir = `../client/dist`

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, clientDir)))
app.use('/graphql', graphqlHandler)
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, clientDir, "index.html"))
})

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))