import { ApolloClient } from 'apollo-client'
import {HttpLink} from "apollo-link-http"
import {InMemoryCache} from "apollo-cache-inmemory"

const GITHUB_BASE_GQL_URL = 'https://api.github.com/graphql'

const httpLink = new HttpLink({
  uri: GITHUB_BASE_GQL_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_KEY}`
  }
})

const cache = new InMemoryCache()

const client = new ApolloClient({ link: httpLink, cache })

export default client