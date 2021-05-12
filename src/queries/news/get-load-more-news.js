import { gql } from '@apollo/client';
//import ImageFragment from "../fragments/image";

/**
 * Get GET_LOAD_MORE_NEWS
 *
 */
export const GET_LOAD_MORE_NEWS = gql`
 query GET_LOAD_MORE_NEWS( $first: Int, $after: String ) {
  posts: posts(first: $first, after: $after) {
    edges {
      node {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
 }

 `