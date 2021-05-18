import {ComponentClass, FunctionComponent} from 'react';
import RouteName from './RouteName';
import {pathToRegexp} from 'path-to-regexp';
import OKRList from '../screens/okrList/OKRList';

export type Route = {
  name: string;
  regexs: Array<{
    regex: any;
    keys: Array<string>;
  }>;
  screen: ComponentClass<any, any> | FunctionComponent<any>;
  params?: Object;
  options?: any;
};

export type AppRoutes = Array<Route>;

export const processRoutes = (
  routes: Array<{
    name: string;
    regexs: Array<string>;
    screen: any;
    params?: Object;
  }>,
) =>
  routes.map(({regexs = [], ...rest}) => ({
    regexs: regexs.map((regex) => {
      const keys: any = [];
      return {
        regex: pathToRegexp(regex, keys),
        keys,
      };
    }),
    ...rest,
  }));

const appRoutes = [
  {
    name: RouteName.OKR_LIST,
    regexs: ['/my/okrs'],
    screen: OKRList,
  },
];

const routes: AppRoutes = processRoutes(appRoutes);
export default routes;
