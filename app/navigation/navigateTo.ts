import routes, {AppRoutes, Route} from './routes';
import {getKeyValue} from '../utils';

const parse = require('url-parse');

// returns the screen to be navigated to based on regex
export const screenForPath = (
  path: string,
  routes: AppRoutes,
): {name?: string; params?: Object; getScreen?: Object} => {
  const result: {name?: string; params?: Object; getScreen?: Object} = {};
  routes.some(({name, regexs, screen, params = {}}: Route) => {
    let res: Array<string> | null = null;
    regexs.some(({regex, keys}: {regex: any; keys: Array<any>}) => {
      res = regex.exec(path);
      if (keys) {
        keys.forEach(({name: paramName}, index) => {
          if (res) {
            let paramValue = getKeyValue(params, paramName);
            if (paramValue) {
              return res.length >= index && (paramValue = res[index + 1]);
            }
          }
        });
      }
      return true;
    });
    if (res) {
      result.name = name;
      result.params = params;
      result.getScreen = screen;
      return true;
    }
  });
  return result;
};

// main navigation part
// this will push the crrent screen on the backstack
const _navigate = (navigation: any, navigationObject: any) => {
  const {params, key} = navigationObject;
  navigation.navigate(navigationObject.routeName, {
    ...params,
    key,
  });
};

// main navigation part
// this will replce the crrent screen and push the new screen on top of the previous screen
const _replace = (navigation: any, navigationObject: any) => {
  const {params, key} = navigationObject;
  navigation.replace(navigationObject.routeName, {
    ...params,
    key,
  });
};

// a central navigateTo function to navigate to tthe screen denoted by regex
export default ({
  navigation,
  path,
  params = {},
  replace = false,
}: {
  navigation: Object;
  path: string;
  params: Object;
  replace?: boolean;
}) => {
  const {pathname, query} = parse(path, true);
  const {
    name,
    params: pathParams,
  }: {name?: string; params?: Object} = screenForPath(pathname, routes);

  replace
    ? _replace(navigation, {
        routeName: name,
        params: {
          ...pathParams,
          ...params,
          appRoute: {url: pathname},
          query,
        },
        key: pathname + (params && JSON.stringify(params)),
      })
    : _navigate(navigation, {
        routeName: name,
        params: {
          ...pathParams,
          ...params,
          appRoute: {url: pathname},
          query,
        },
        key: pathname + (params && JSON.stringify(params)),
      });
};
