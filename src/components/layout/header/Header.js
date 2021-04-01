import Nav from "../header/Nav"
import {isEmpty} from 'lodash'
const Header =({headerMenus,header})=>{

    if(isEmpty(headerMenus)){
        return null
    }

    return (
        <header className="sticky top-0 h-full z-50">
            <Nav header={header} headerMenus={headerMenus}/>
        </header>    
    )
}
export default Header
