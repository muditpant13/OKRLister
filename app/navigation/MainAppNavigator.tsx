import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackView, {StackViewProps} from './StackView';
import RouteName from './RouteName';
import routes from './routes';
import {screenForPath} from './navigateTo';

type NavigatorProps = {
  initialUrl?: string;
  initialParams?: any;
};

const AppNavigator = (props: NavigatorProps) => {
  const {name = RouteName.OKR_LIST, params = {}} =
    (props.initialUrl && screenForPath(props.initialUrl, routes)) || {};
  const initialParamsFromApp = props.initialParams || {};
  const stackViewProps: StackViewProps = {
    initialRouteName: name,
    initialParams: {...initialParamsFromApp, ...params},
  };
  const NavigationComponent = AppStackView(stackViewProps);
  return <NavigationContainer>{NavigationComponent}</NavigationContainer>;
};

export default AppNavigator;
