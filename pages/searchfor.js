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
import client from '../src/apollo/client'

import {GET_SEARCH_RESULTS_WITH_TOTAL_PAGES,GET_SEARCH_RESULTS} from '../src/queries/search/get-search-results'
import Loading from '../src/components/search/loading/index';
import ErrorMessage from '../src/components/search/error/index';
import ResultInfo from '../src/components/search/result-info';
import Router from 'next/router'

export default function searchfor ( {dataa} ) {
	
    
   const [ searchError, setSearchError ] = useState( '' );
  const [ queryResultPosts, setQueryResultPosts  ] = useState( {} );
  const [ showResultInfo, setShowResultInfo ] = useState( false );

  const searchQueryString = process.browser ? Router?.query?.s : '';


	const router = useRouter();
    const { header, footer, headerMenus, footerMenus, slug } = dataa || {};
    const [ searchQuery, setSearchQuery ] = useState(gsearchQueryString);



   const [ fetchPosts,{ loading} ] = useLazyQuery( GET_SEARCH_RESULTS_WITH_TOTAL_PAGES, {
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
      const totalPostResultCount = queryResultPosts?.pageInfo?.offsetPagination?.total;
     
      console.log("results",queryResultPosts)
      console.log("query",searchQuery)

      useEffect (()=>{
        
        if(searchQueryString){
          setSearchQuery(searchQueryString)
          fetchPosts( {
            variables: {
              first: PER_PAGE_FIRST,
              after: null,
              query: searchQuery
            }
          } );
        }


      },[searchQueryString])

	return (
        <>
        <Header header={ header } headerMenus={ headerMenus?.edges ?? [] } slug={slug}/>
        <div className="mx-auto min-h-almost-screen  " >
         <SearchBox
          searchQuery={ searchQuery }
          setSearchQuery={ setSearchQuery }
          handleSearchFormSubmit={handleSearchFormSubmit}

         /> 
         <ResultInfo showResultInfo={showResultInfo} totalPostResultCount={totalPostResultCount} classnames="mt-4 text-center" />
          <ErrorMessage text={searchError} classes="max-w-xl mx-auto -mt-8"/>
          <Loading visible={loading} showSpinner classes=" text-center    mx-auto mt-11"/>
          <LoadMorePosts
              posts={queryResultPosts}
              classes="md:container px- py-12 mx-auto  min-h-almost-screen"
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


