import DOMPurify from 'dompurify';

export const sanitize = ( content ) => {
	return process.browser ? DOMPurify.sanitize( content ) : content;
};

export const getSingularOrPluralText = ( count, text ) => {
	return 1 < count ? `${text}s` : text;
  };