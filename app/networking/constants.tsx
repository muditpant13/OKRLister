//get endpoints
export enum GetEndpoints {
  GET_OKRS = 'sample-okrs/db.json',
}

// post endpoints
export enum PostEndpoints {}

//generic http response codes for n/w error handling
export enum HTTP_CODES {
  HTTP_STATUS_OK = 200,
  HTTP_UNAUTHORIZED = 401,
  HTTP_NOT_FOUND = 404,
  HTTP_GENERIC_ERROR = 500,
  HTTP_NO_NETWORK = 1001,
}

// Http methods
// we willl be using only get for this project
export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}
