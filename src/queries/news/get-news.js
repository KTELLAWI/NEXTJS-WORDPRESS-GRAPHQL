import { gql } from '@apollo/client'
//import MenuFragment from '../fragments/menus'
//import SeoFragment from "../fragments/seo";
//import {HeaderFooter} from "../get-menus";
//import ImageFragment from "../fragments/image";

/**
 * Get News Posts
 *
 */
export const GET_NEWS = gql`
 query GET_NEWS( $uri: String, $first: Int, $after: String ) {
    header: getHeader {
        favicon
        siteLogoUrl
        siteTagLine
        siteTitle
      }
    footer: getFooter {
        copyrightText
        sidebarOne
        sidebarTwo
        socialLinks {
          iconName
          iconUrl
        }
      }
    headerMenus: menuItems(where: {location: HCMS_MENU_HEADER, parentId: "0"}) {
          edges {
            node {
              id
              label
              path
              url
      
              childItems {
                edges {
                  node {
                    id
                    label
                    path
                    url
                  }
                }
              }
            }
          }
        }
    footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER, parentId: "0"}) {
          edges {
            node {
              id
              label
              path
              url
      
                childItems {
                 edges {
                  node {
                    id
                    label
                    path
                    url
                  }
                }
              }
            }
          }
        }
    page: pageBy(uri: $uri) {
    id
    title
    content
    slug
    uri
    seo{
        breadcrumbs {
            text
            url
          }
          title
          metaDesc
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphAuthor
          opengraphDescription
          opengraphTitle
          schemaDetails
          opengraphImage {
            sourceUrl
          }
          opengraphSiteName
          opengraphPublishedTime
          opengraphModifiedTime
          twitterTitle
          twitterDescription
          twitterImage {
            sourceUrl
          }
    }
  }
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
    }
    pageInfo {
      offsetPagination {
        total
      }
      hasNextPage
      endCursor
    }
  }
 }

 `;