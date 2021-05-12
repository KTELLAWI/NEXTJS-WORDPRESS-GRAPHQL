import Head from 'next/head';
import { isEmpty } from 'lodash';
import { gql,useLazyQuery,useQuery } from '@apollo/client';

import  GET_MENUS  from '../src/queries/get-menus';
import { handleRedirectsAndReturnData } from '../src/utils/slugs';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import Header from '../src/components/layout/header/Header';
import Footer from "../src/components/layout/Footer"
import SearchBox from '../src/components/search/search-box';
import { PER_PAGE_FIRST } from "../src/utils/pagination";
import LoadMorePosts from '../src/components/news/load-more-posts'

import {GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,GET_SEARCH_RESULTS} from '../src/queries/search/get-search-results'

export default function searchfor ( {dataa} ) {
	
    
   const [ searchError, setSearchError ] = useState( '' );
  const [ queryResultPosts, setQueryResultPosts  ] = useState( {} );
  const [ showResultInfo, setShowResultInfo ] = useState( false );


	const router = useRouter();
    const { header, footer, headerMenus, footerMenus, slug } = dataa || {};
    const [ searchQuery, setSearchQuery ] = useState( );


       const GET_SEARCH = gql`
       query GET_SEARCH( $first: Int, $after: String, $query: String ) {
        posts: posts(first: $first, after: $after, where: {search: $query}) {
          edges {
            node {
                id
                title
                excerpt
                slug
                featuredImage {
                  node {
                    sourceUrl
	                altText
                  }
                }
            }
            cursor
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
    `
///////////////////////

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`
;
/** 
const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

*/
/** 
const { loading, error, data } = useQuery( GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,
    {
        variables: {
            first: PER_PAGE_FIRST,
            after: null,
            query: searchQuery
          },
          onCompleted: ( data ) => {
              const dd=JSON.parse(data)
            setQueryResultPosts( dd );
            setShowResultInfo( true );
            console.log("ddddd",data);
          },
   
  })
 
  if (loading) return <p>Loading ...</p>;
  if (error)return `Error! ${error.message}`;

*/

////////////////////////////
   const [ fetchPosts ] = useLazyQuery( GET_SEARCH_RESULTS_WITH_TOTAL_PAGES, {
   // fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: ( data ) => {
      setQueryResultPosts( data?.posts ?? {} );
      setShowResultInfo( true );
      console.log("ddddd",data);
    },
    onError: ( error ) => {
      setSearchError( error?.graphQLErrors ?? '' );
    }
  } );



    const handleSearchFormSubmit = ( event ) => {

        event.preventDefault();
       
      setShowResultInfo( false );
     
        if ( isEmpty( searchQuery ) ) {
          setSearchError( 'Please enter text to search' );
          setQueryResultPosts( {} );
          return null;
        }
    
        setSearchError( '' );
    
        fetchPosts( {
          variables: {
            first: PER_PAGE_FIRST,
            after: null,
            query: searchQuery
          }
        } );
        
        console.log("results",queryResultPosts)
        console.log("query",searchQuery)
  
      };
      
     
      console.log("results",queryResultPosts)
      console.log("query",searchQuery)

	return (
        <>
        <Header header={ header } headerMenus={ headerMenus?.edges ?? [] } slug={slug}/>
        <div className="mx-auto min-h-almost-screen " >
         <SearchBox
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
          handleSearchFormSubmit={handleSearchFormSubmit}

         /> 
          <LoadMorePosts
              posts={queryResultPosts}
              classes="md:container px-5 py-12 mx-auto min-h-almost-screen"
              graphQLQuery={GET_SEARCH_RESULTS}
              searchQuery={searchQuery}
          />
         </div>  
        <Footer footer={ footer } footerMenus={ footerMenus?.edges ?? [] }/>


			

    </>
	);
}

export async function getStaticProps( context ) {

	const {data, errors} = await client.query( {
		query: GET_MENUS
	} );
	const defaultProps = {

		props: {
			dataa: {...data, slug: 'search'}
		},
		revalidate: 1,
		// will be passed to the page component as props
	};
	return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );

}


