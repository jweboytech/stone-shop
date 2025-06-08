import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://t0mixa-kq.myshopify.com/api/2025-04/graphql.json';

const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': '57982e04d87cfb57f3cc0bb3e1c95c3a',
  },
});

export default gqlClient

