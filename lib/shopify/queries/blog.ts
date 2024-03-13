const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    ... on Blog {
      id
      title
      handle
    }
  }
`;

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!) {
    blogByHandle(handle: $handle) {
      articles(first: 100) {
        edges {
          node {
            title
            id
            publishedAt
            tags
            handle
            excerptHtml
            image {
              url
            }
            content
          }
        }
      }
      title
    }
  }
`;

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs {
    blogs(first: 100) {
      edges {
        node {
          ...blog
        }
      }
    }
  }
  ${blogFragment}
`;
