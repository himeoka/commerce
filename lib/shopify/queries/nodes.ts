export const getNodesQuery = /* GraphQL */ `
  query getNodes($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on MediaImage {
        id
        image {
          url
          height
          width
          altText
        }
      }
      ... on Metaobject {
        fields {
          key
          value
        }
      }
    }
  }
`;
