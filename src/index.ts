import express from 'express'
import { expressMiddleware } from '@apollo/server/express4';
import createApolloServerGraphQL from './graphql';

async function server() {
    const app = express()

    const PORT = process.env.PORT || 8000

    app.use(express.json())

    app.get('/', (req, res) => {
        res.json({ message: "Server is running successfully" })
    })

    app.use('/graphql', expressMiddleware(await createApolloServerGraphQL()))



    app.listen(PORT, () => {
        console.log(`Server listening on PORT : ${PORT}`)
    })
}

server()

