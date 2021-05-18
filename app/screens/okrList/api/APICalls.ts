import ApiRequest from '../../../networking/ApiRequests';
import {ApiError} from '../../../networking/types';
import {OkrApiResposne} from './Models';
import {GetEndpoints} from '../../../networking/constants';
import {createOkrViewData} from '../utils';

export const fetchOKRData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const path = GetEndpoints.GET_OKRS;
    ApiRequest(path)
      .then((result: any) => {
        return result as OkrApiResposne;
      })
      .then((result) => resolve(createOkrViewData(result)))
      .catch((err: ApiError) => {
        reject(err);
      });
  });
};
