export const GET_CART = `
    query getCart($id: ID!) {
        cart(id: $id){
            id
            createdAt
            updatedAt
            lines(first: 10) {
            edges {
                node {
                    id
                    quantity
                    merchandise {
                            ... on ProductVariant {
                                product {
                                    title
                                    description
                                }
                                id
                                title
                                image {
                                    url
                                }
                            }
                        }
                        attributes {
                            key
                            value
                        }
                    }
                }
            }
            attributes {
                key
                value
            }
            cost {
                totalAmount {
                    amount
                    currencyCode
                }
                subtotalAmount {
                    amount
                    currencyCode
                }
                totalTaxAmount {
                    amount
                    currencyCode
                }
                totalDutyAmount {
                    amount
                    currencyCode
                }
            }
        }
    }
`;

export const CREATE_CART = `
    mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
            cart {
                id
                checkoutUrl
            }
            userErrors {
                field
                message
            }
        }
    }
`;
