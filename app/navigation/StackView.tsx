import React from 'react';
import routes, {Route} from './routes';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors, getColor} from '../styles/colors';
import {TextView} from '../components/atoms/TextView';
import {HeaderTitleMap} from './headerOptions';
import {FontStyles} from '../styles/fonts/names';
import {Sizes} from '../styles/fonts/sizes';

const Stack = createStackNavigator();

export type StackViewProps = {
  initialRouteName: string;
  initialParams: any;
};

const StackView = (props: StackViewProps) => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerTitle: () => (
          <TextView fontFamily={FontStyles.bold} fontSize={Sizes.medium}>
            {HeaderTitleMap[route.name] || ''}
          </TextView>
        ),
        headerTitleAlign: 'center',
        headerBackTitle: undefined,
        headerTintColor: getColor({color: Colors.white}),
      })}
      initialRouteName={props.initialRouteName}>
      {getAllNavigationScreens(
        routes,
        props.initialParams,
        props.initialRouteName,
      )}
    </Stack.Navigator>
  );
};

const getAllNavigationScreens = (
  appRoutes: any,
  initialRouteName: string,
  initialParams: any,
) => {
  return appRoutes.map((appRoute: Route) => {
    return (
      <Stack.Screen
        name={appRoute.name}
        key={appRoute.name}
        component={appRoute.screen}
        options={{...appRoute.options}}
        initialParams={initialRouteName === appRoute.name ? initialParams : {}}
      />
    );
  });
};

export default StackView;
