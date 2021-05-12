import { isEmpty } from "lodash";
import Link from "next/link";
import {useState} from 'react'
import {isCustomPageUri} from '../../../utils/slugs'
import PropTypes from 'prop-types';
import NavSearch from '../../../components/search/nav-search/index'
import  SvgSearchIcon  from '../../../icons/SvgSearchIcon';


const Nav = ({headerMenus,header,slug}) => {

	if ( isEmpty(headerMenus) ) {
		return null;
	}

	const [ isMenuVisible, setMenuVisibility ] = useState(false);
  console.warn("header",header)

	return (
		<div className=''>
		<nav className="flex  items-center justify-between flex-wrap bg-white box-border shadow-lg p-6 ">
			<div className="flex   items-center flex-shrink-0 text-white mr-6 ">
				<Link href="/">
					<a>
				<img src={header.siteLogoUrl} width='150' height="100" className="mr-4"/>
				</a>
				</Link>
				<div className="flex flex-col items-center justify-start	">
				<span className="font-semibold text-xl tracking-tight has-text-color-black text-black">{header?.siteTitle}</span>
				<span className="text-black text-sm">{header?.siteTagLine}</span>
				</div>
			</div>
			<div className="block   lg:hidden">
				<button
					onClick={() => setMenuVisibility(! isMenuVisible)}
					className="flex sticky top-0 items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-black hover:border-secondary">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
					</svg>
				</button>
			</div>
			<div className={`${ isMenuVisible ? 'max-h-full' : 'h-0' }   overflow-hidden lg:h-auto text-color-blue-300 w-full block flex-grow lg:flex lg:items-center  justify-end lg:w-auto sticky top-0`}>
				{ headerMenus?.length ? (
					//<div className="text-m lg:flex-grow ml-7 justify-between-space  flex items-end ">
					<div className="text-sm lg:flex-grow">
						{  headerMenus?.map( menu => {
							if (! isCustomPageUri(menu?.node?.path)){
								return(
									<Link key={menu?.node.id} href={menu?.node?.path}>
								<a
									className="block   mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:color-blue-200 mr-4 text-m">
									{menu?.node?.label}
								</a>
							</Link>
								)
								
							}
							
						  } ) }
						  <Link href='/blog/'>
								<a className="block   mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:color-blue-200 mr-4 text-m">BLOG</a>
							</Link>
							<Link href='/news/'>
								<a className="block   mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:color-blue-200 mr-4 text-m">NEWS</a>
							</Link>
							<Link href='/searchfor'>
							<div className="flex items-center space-between ">
							<SvgSearchIcon className="h-4 w-4 fill-current text-gray-500 block  lg:hidden"/>
								<a className="block    lg:hidden lg:mt-0 text-teal-200 hover:color-blue-200 mr-4 text-m">SEARCH</a>
							</div>
							   
							</Link>
							


					</div>
				) : null }
				
				
			</div>
			<div className="hidden sm:block flex-col-reverse">
				{"search"!= slug ? (
					<NavSearch

					/>
				):null}
			</div>
		</nav>
		</div>
	)
}

export default Nav;
Nav.propTypes = {
    header: PropTypes.object,
    headerMenus: PropTypes.array,
    slug: PropTypes.string
  };
  
Nav.defaultProps = {
    header: {},
    headerMenus: [],
    slug: ''
  };