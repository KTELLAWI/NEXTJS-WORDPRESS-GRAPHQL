import PropTypes from 'prop-types';
import cx from 'classnames';
import {isEmpty} from 'lodash';

const ErrorMessage = ( { text, classes } ) => {
  if ( isEmpty( text ) ) {
    return null;
  }

  return (
    <div className={cx( 'bg-blue-800  border-l-8 border-green-300 text-white p-3', classes )} role="alert">
      <p>{ text }</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  text: PropTypes.string,
  classes: PropTypes.string
};

export default ErrorMessage;