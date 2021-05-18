import {HTTP_CODES} from './constants';
import {
  ERROR_401,
  ERROR_404,
  ERROR_OTHERS,
  ERROR_NO_NETWORK,
} from '../assets/stringLiterals';
import {ApiError, QueryParam} from './types';

const createErrorData = (statusCode: number): ApiError => {
  switch (statusCode) {
    case HTTP_CODES.HTTP_UNAUTHORIZED:
      return {
        statusCode,
        description: ERROR_401,
      } as ApiError;
    case HTTP_CODES.HTTP_NOT_FOUND:
      return {
        statusCode,
        description: ERROR_404,
      } as ApiError;
    case HTTP_CODES.HTTP_NO_NETWORK:
      return {
        statusCode,
        description: ERROR_NO_NETWORK,
      } as ApiError;
    default:
      return {
        statusCode,
        description: ERROR_OTHERS,
      } as ApiError;
  }
};

export const getErrorData = (statusCode: number): ApiError => {
  return createErrorData(statusCode);
};

export const createQueryParamsString = (
  queryParams?: Array<QueryParam>,
): string => {
  let queryParamsString: string = '';
  if (queryParams && queryParams.length > 0) {
    queryParams.map((queryParam: QueryParam, index: number) => {
      if (queryParam.name && queryParam.value) {
        if (index > 0) {
          queryParamsString = `${queryParamsString}&`;
        }
        queryParamsString = `${queryParamsString}${queryParam.name}=${queryParam.value}`;
      }
    });
  }
  return queryParamsString;
};
