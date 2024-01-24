import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.HASURA_URL,
  headers: {
    Authorization: `Bearer ${process.env.HASURA_ADMIN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
