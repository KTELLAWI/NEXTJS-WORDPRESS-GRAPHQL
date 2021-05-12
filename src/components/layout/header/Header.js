import Nav from "../header/Nav"
import {isEmpty} from 'lodash'
import PropTypes from 'prop-types';
const Header =({headerMenus,header,slug})=>{

    if(isEmpty(headerMenus)){
        return null
    }

    return (
        <header className="sticky top-0 h-full z-50">
            <Nav header={header} headerMenus={headerMenus} slug={slug}/>
        </header>    
    )
}
export default Header
Header.propTypes = {
    header: PropTypes.object,
    headerMenus: PropTypes.array,
    slug: PropTypes.string
  };
  
  Header.defaultProps = {
    header: {},
    headerMenus: [],
    slug: ''
  };