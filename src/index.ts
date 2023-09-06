import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function server() {
    const app = express()

    const PORT = process.env.PORT || 8000

    app.use(express.json())

    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query{
                hello:String,
                say(name:String):String!
            }
        `,
        resolvers: {
            Query:{
                hello:()=>'This is Graphql server',
                say:(_,{name}:{name:String})=>`Hello, ${name} How are you?`
            }
        }
    })

    //Start the server
    await gqlserver.start()

    app.get('/', (req, res) => {
        res.json({ message: "Server is running successfully" })
    })

    app.use('/graphql',expressMiddleware(gqlserver))



    app.listen(PORT, () => {
        console.log(`Server listening on PORT : ${PORT}`)
    })
}


server()