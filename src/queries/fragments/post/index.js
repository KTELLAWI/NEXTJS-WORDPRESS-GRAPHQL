import ImageFragment from './image/index'
const PostFragment = `
 fragment PostFragment on Post {
  id
  title
  excerpt
  slug
  featuredImage {
    node {
      ...ImageFragment
    }
  }
 }
 ${ImageFragment}
`
export default PostFragment;