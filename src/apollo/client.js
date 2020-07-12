import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://gql-2.test.serafim.help/v1/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        "x-hasura-admin-secret":
          '123-123-123-123-123',
      },
    })
  },
  fetch
});


// import ApolloClient from 'apollo-boost';
// import fetch from 'isomorphic-fetch';
//
// export const client = new ApolloClient({
//   uri: 'https://api-euwest.graphcms.com/v1/cjke2kn7p00ol01d2pinkptdj/master',
//   fetch,
// });
