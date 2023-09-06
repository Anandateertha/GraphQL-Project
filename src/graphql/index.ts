import { ApolloServer } from '@apollo/server';
import { User } from './user';

async function createApolloServerGraphQL() {

    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query{
                hello:String
            }

            type Mutation{
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation:{
                ...User.resolvers.mutations
            }
        }
    })

    //Start the server
    await gqlserver.start()

    return gqlserver

}

export default createApolloServerGraphQL
