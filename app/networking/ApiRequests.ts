import APIService from './ApiService';
import {ApiMethod, ApiHeader, QueryParam} from './types';
import {HTTP_CODES, HTTP_METHODS} from './constants';
import {getErrorData, createQueryParamsString} from './utils';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

// base url for our OKR project
const baseUrl = 'https://okrcentral.github.io/';

const apiService = new APIService();

// create API endpoint by adding path,a nd queryparams to baseurl
const getApiEndpoint = (path: string, queryParams?: string) => {
  let endpoint: string = `${baseUrl}${path}`;
  if (queryParams) {
    endpoint = `${endpoint}?${queryParams}`;
  }
  return endpoint;
};

// all api calls will call this single method which will return data/error based on n/w state and http reponse
// in future auth logic AT/RT etc will all be handled here
const ApiRequest = (
  path: string,
  method?: ApiMethod,
  requestBody?: any,
  headers?: ApiHeader[],
  queryParams?: Array<QueryParam>,
) => {
  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((state: NetInfoState) => {
        if (state.isConnected) {
          method = method || 'GET';
          const apiEndpoint = getApiEndpoint(
            path,
            createQueryParamsString(queryParams),
          );
          apiService.setMethod(method);

          // add defaault heades if any in this case we are adding content type to all calls
          apiService.addDefaultHeader();

          if (headers) {
            apiService.addHeaders(headers);
          }
          requestBody = requestBody || {};

          // a single fetch call
          // different http requests based on different methods
          fetch(
            apiEndpoint,
            method === HTTP_METHODS.GET
              ? apiService.get()
              : apiService.postOrPut(requestBody),
          )
            .then((response) => {
              if (response.status === HTTP_CODES.HTTP_STATUS_OK && response) {
                resolve(response.json());
              } else {
                reject(getErrorData(response.status));
              }
            })
            .catch(() => {
              reject(getErrorData(HTTP_CODES.HTTP_GENERIC_ERROR));
            });
        } else {
          reject(getErrorData(HTTP_CODES.HTTP_NO_NETWORK));
        }
      })
      .catch(() => {
        reject(getErrorData(HTTP_CODES.HTTP_NO_NETWORK));
      });
  });
};

export default ApiRequest;
