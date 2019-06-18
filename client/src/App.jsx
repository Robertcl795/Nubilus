import React, { Fragment } from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import Launches from './components/Launches';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql'
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Fragment>
                <Launches/>
            </Fragment>
        </ApolloProvider>
    )
}

export default App
