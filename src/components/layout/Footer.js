import { isNonEmptyArray } from '@apollo/client/utilities'
import {isEmpty,isArray} from 'lodash'
import{sanitize} from '../../utils/miscellanous'
import Link from "next/link";
import {getIconComponentByName} from '../../utils/icon-map'
import NewsletterForm from '../footer/NewsletterForm';
import NewsletterSubscribe from '../footer/NewsletterSubscribe';


    

const Footer =({footer,footerMenus})=>{
    
    
    return(
  <footer className=" grid grid-cols-1 w-full   z-0    bg-secondary p-6 mb-auto md:grid-cols-1">
              <div className=" grid grid-cols-1 justify-center items-center md:grid-cols-2  overflow-hidden">
                <div class=" flex-col items-center justify-center overflow-hidden  md:justify-start  ">

                               <div className=' flex items-center justify-center md:justify-start' >
                          { ! isEmpty(footer?.socialLinks) && isArray(footer?.socialLinks) ?
                          (
                            <ul className="flex items-center md:justify-start ">
                            {footer?.socialLinks.map(sociallink =>(
                              <li key ={sociallink?.iconName} className="ml-2">
                                <a href={sociallink?.iconUrl}>
                                  {getIconComponentByName(sociallink?.iconName)}

                                </a>
                              </li>
                            ))}
                          </ul>
                            ) :null
                            
                            }
                            </div>


                                                          <div class="text-white flex items-center justify-center md:justify-start">

                          {footer?.copyrightText ? footer?.copyrightText  : "@ Copyrighits aroma insider" }
                          </div>

                          </div>

               

 

                         <div  className="flex  justify-center items-center overflow-hidden  md:justify-center  ">
                         
                       <NewsletterSubscribe/>

                      </div>


                     
                      </div>  

</footer>
    )
}

export default Footer;

{/**

 <div className="my-2 px-2 w-1/3 overflow-hidden sm:w-1/3 lg:w-1/3 xl:w-1/3">

  <div className="text-white" dangerouslySetInnerHTML={{__html: sanitize(footer?.sidebarTwo) }} /> 
  </div>

*/}