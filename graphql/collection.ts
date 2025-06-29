export const GET_COLLECTIONS = `
  query getCollections($first: Int = 10){
    collections(first: $first) {
        edges {
        node {
          id
          title
          image {
            url
          }
        }
      }
    }
  }
`;
