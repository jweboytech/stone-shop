import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://t0mixa-kq.myshopify.com/api/2025-04/graphql.json': {
      headers: {
        'X-Shopify-Storefront-Access-Token': '57982e04d87cfb57f3cc0bb3e1c95c3a',
      },
    },
  },
  documents: ['./graphql/**/*.{gql,graphql}'], // 也可写成 ['./src/**/*.ts']
  generates: {
    './generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true, // 自动生成 React Hooks
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

export default config;
