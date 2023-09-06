import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from './lib/db';

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

            type Mutation{
                createuser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'This is Graphql server',
                say: (_, { name }: { name: String }) => `Hello, ${name} How are you?`
            },
            Mutation: {
                createuser: async (_, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
                    try {
                        await prismaClient.user.create({
                            data: {
                                email,
                                firstName,
                                lastName,
                                password,
                                salt: "random_salt",
                                profileImageURL: "random_photo"
                            }
                        })
                        return true
                    } catch (error) {
                        console.log(error)
                        return false
                    }

                }
            }
        }
    })

    //Start the server
    await gqlserver.start()

    app.get('/', (req, res) => {
        res.json({ message: "Server is running successfully" })
    })

    app.use('/graphql', expressMiddleware(gqlserver))



    app.listen(PORT, () => {
        console.log(`Server listening on PORT : ${PORT}`)
    })
}


server()