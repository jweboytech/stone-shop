export const GET_COLLECTIONS = `
  query {
    collections(first: 10) {
        edges {
        node {
            id
            title
        }
      }
    }
  }
`;

// export const GET_COLLECTIONS = `
//   query {
//     collections(first: 2) {
//         edges {
//         node {
//             id
//             products(first: 5) {
//             edges {
//                 node {
//                 id
//                 title
//                 }
//             }
//             }
//         }
//         }
//     }
//   }
// `;