export const CHANGE_SEARCH_FIELD = 'CHANGE_SEARCH_FIELD';

//create a constant for the 'request robots' async call, which will have 3 states:
//'Pending' which means the request is just been made to the API and waiting on response.
//Success which means the request was successful, and otherwise failed. This is standard of
//all async actions like AJAX calls.
export const REQUEST_ROBOTS_PENDING = 'REQUEST_ROBOTS_PENDING';
export const REQUEST_ROBOTS_SUCCESS = 'REQUEST_ROBOTS_SUCCESS';
export const REQUEST_ROBOTS_FAILED = 'REQUEST_ROBOTS_FAILED';