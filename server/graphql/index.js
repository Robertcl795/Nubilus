import graphqlHTTP from 'express-graphql'
import schema from './schema/schema'
import resolvers from './resolvers/resolvers'

export default graphqlHTTP({
    schema, 
    rootValue: resolvers,
    graphiql: true,
})