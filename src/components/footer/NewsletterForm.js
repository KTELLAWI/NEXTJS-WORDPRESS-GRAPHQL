import React from "react";
import {sanitize} from '../../utils/miscellanous'
import Loading from "../../components/search/loading/index"
import { useState } from 'react';
const  NewsletterForm = ({message,status,onValidated}) => {
    const [error,setError] = useState(null)
    const [ email, setEmail ] = useState(null);
    const handleFormSubmit = () => {

        setError(null);
    
        if ( ! email ) {
          setError( 'Please enter a valid email address' );
          return null;
        }
    
        const isFormValidated = onValidated({ EMAIL: email });
    
        // On success return true
        return email && email.indexOf("@") > -1 && isFormValidated;
      }
    
      /**
       * Handle Input Key Event.
       *
       * @param event
       */
      const handleInputKeyEvent = ( event ) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          handleFormSubmit();
        }
      }
    
      /**
       * Extract message from string.
       *
       * @param {String} message
       * @return {null|*}
       */
      const getMessage = (message) => {
        if ( !message ) {
          return null;
        }
        const result = message?.split('-') ?? null;
        if ( "0" !== result?.[0]?.trim() ) {
          return sanitize(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? sanitize( formattedMessage ) : null;
      }
    


    return (
        <div>
            <div className=' flex w-full'>
            <h3 className="hidden md:inline-flex mb-1 uppercase text-white font-bold">Subscribe to newsletter</h3>

              
              
            </div>
      
        <form class="w-full max-w-sm">
                <div class="flex items-center border-b border-teal-500 py-2">
    <input 
    type="email"
    onKeyUp={(event) => handleInputKeyEvent(event)}
    onChange={(event) => setEmail(event?.target?.value ?? '')}
    class="appearance-none bg-white border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Please Enter Your Email" aria-label="Full name"/>
    <button
    onClick={handleFormSubmit}
     class="flex-shrink-0 text-blue-900 bg-white hover:bg-white border-teal-500 hover:border-teal-700 text-sm border-4  py-1 px-2 rounded" type="button">
      SUBMIT
    </button>
    
            </div>
            
            </form>
            {'sending' === status ? <Loading showSpinner message="Sending..." ontentColorClass="text-white" hasVisibilityToggle={false}/> : null} 
              {'error' === status || error ? (<div className="text-white pt-2" dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}/>) : null } 
              {'success' === status && 'error' !== status && !error && (<div className="text-white font-bold pt-2" dangerouslySetInnerHTML={{ __html: sanitize(message) }} /> )}
            </div>


    );
}

export default NewsletterForm;
