import gql from "graphql-tag"

export const GET_USERS = gql`
  query($search_term: String!) {
    search(query: $search_term, type: USER, first: 20) {
      edges {
        node {
          ... on User {
            login,
            avatarUrl,
            repositories(first: 50, isFork: false) {
              edges {
                node {
                  ... on Repository {
                    name,
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
`