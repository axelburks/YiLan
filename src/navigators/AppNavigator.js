import { createStackNavigator } from 'react-navigation';
import routeConfigMap from './routeConfigMap';
import stackConfig from './stackConfig';

const AppNavigator = createStackNavigator(routeConfigMap, stackConfig);

export default AppNavigator;
