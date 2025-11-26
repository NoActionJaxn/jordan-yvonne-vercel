import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { STRAPI_URL } from "../../constants/strapi";

const client = new ApolloClient({
  link: new HttpLink({
    uri: STRAPI_URL + '/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;