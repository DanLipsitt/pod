import cookie from 'cookie';

const cookies = (typeof (document) !== 'undefined') ?
                cookie.parse(document.cookie) :
                {}; // for test environments outside the browser

Object.freeze(cookies);

export {cookies as default};
