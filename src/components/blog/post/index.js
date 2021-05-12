import Link from "next/link";
import Image from "../../image/index";
import {sanitize} from "../../../utils/miscellanous";
import {DEFAULT_IMG_URL} from "../../../utils/constants";


const Post = ({post}) => {
    const myLoader = ({ src, width, quality }) => {
        return `https://example.com/${src}?w=${width}&q=${quality || 75}`
      }
  console.log(post)
    return (
        <div className="mb-8">
            <Link href={`${post?.slug}/`}>
            <a>
          <figure className="overflow-hidden mb-4">
            <Image 
            { ...post?.featuredImage?.node } width="400" height="225" loader={myLoader}  layout="fill" containerClassNames="w-96 sm:-w-600px md:w-400px h-56 sm:h-338px md:h-225px" title={post?.title ?? ''}/>

            </figure>
            </a>
            </Link>
            <Link href={`${post?.slug}/`}>
                <a>
                    <h2 className="font-bold mb-3 text-lg hover:text-blue-500" dangerouslySetInnerHTML={{__html: sanitize( post?.title ?? '' )}}/>
                </a>
            </Link>
            <div dangerouslySetInnerHTML={{__html: sanitize( post?.excerpt ?? '' )}}/>
        </div>
    );
}

export default Post

//              // 