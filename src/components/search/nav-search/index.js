import searchForm from '../search-form';
import Router from 'next/router'
import {useState} from 'react'
import SearchForm from '../search-form';



const NavSearch =()=>{

    const [searchQuery,setSearchQuery] =useState()
    const handleSearchFormSubmit= ( event ) => {
        event.preventDefault();
        Router.push(`/searchfor?s=${searchQuery}`)
        return null;
    }


    return(
        <div>
            <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchFormSubmit={handleSearchFormSubmit}



            />
        </div>



    )






}

export default NavSearch