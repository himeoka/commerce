const articleFragment = /* GraphQL */ `
  fragment article on Article {
    ... on Article {
      contentHtml
      handle
      publishedAt
      tags
      title
      image {
        url
      }
    }
  }
`;

export const getArticleQuery = /* GraphQL */ `
  query getArticle($id: ID!) {
    article(id: $id) {
      ...article
    }
  }
  ${articleFragment}
`;
