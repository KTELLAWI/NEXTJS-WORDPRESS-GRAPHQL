import PropTypes from 'prop-types';
import SearchForm from './search-form';

const SearchBox = ( {searchQuery, setSearchQuery, handleSearchFormSubmit} ) => {

  return (
    <div className="bg-gradient-to-r from-white to-blue-900 px-1">
      <div className="info max-w-xl mx-auto py-5">
        <br/>
        <h2 className="text-center text-white py-4 text-3xl uppercase font-bold">Find your needs</h2>
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchFormSubmit={handleSearchFormSubmit}
        />
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  handleSearchFormSubmit: PropTypes.func
};

SearchBox.defaultProps = {
  searchQuery: '',
  setSearchQuery: () => null,
  handleSearchFormSubmit: () => null
};

export default SearchBox;