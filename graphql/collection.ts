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

export const GET_PRODUCTS_BY_COLLECTION = `
  query getProductsByCollection($title: String!) {
    collections(query: $title, first: 1) {
      edges {
        node {
          id
          title
          image {
            url
          }
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                images(first:2) {
                  nodes {
                    url
                    id
                  }
                }
                priceRange {
                  maxVariantPrice {
                    amount 
                    currencyCode
                  }
                  minVariantPrice {
                    amount 
                    currencyCode
                  }
                }
                compareAtPriceRange {
                  maxVariantPrice {
                    amount 
                    currencyCode
                  }
                  minVariantPrice {
                    amount 
                    currencyCode
                  }
                }
                variants(first: 10) {
                  nodes {
                      id
                      image {
                          url
                      }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
