export const GET_PRODUCT_DETAILS = `
  query getProductDetails($handle: String!){
    productByHandle(handle:$handle) {
        title
        productType
        createdAt
        descriptionHtml
        category {
            name
        }
        images(first: 10) {
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
                title
                image {
                    url
                }
            }
        }
    }
  }
`;
