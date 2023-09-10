import express from 'express'
import { expressMiddleware } from '@apollo/server/express4';
import createApolloServerGraphQL from './graphql';
import UserService from './services/user';

async function server() {
    const app = express()

    const PORT = process.env.PORT || 8001

    app.use(express.json())

    app.get('/', (req, res) => {
        res.json({ message: "Server is running successfully" })
    })

    app.use('/graphql', expressMiddleware(await createApolloServerGraphQL(), {
        context: async ({ req }) => {
            const token = req.headers['token'];

            try {
                const userData = UserService.decodeTheToken(token as string); // Pass the actual token variable
                return { id:userData.id,email:userData.email };
            } catch (error) {
                console.log(error)
                return {}
            }
        }
    }))




    app.listen(PORT, () => {
        console.log(`Server listening on PORT : ${PORT}`)
    })
}

server()

