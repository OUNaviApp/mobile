import React from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {MapScreen} from './screens/MapScreen';
import {MarkerScreen} from './screens/MarkerScreen';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const MapStack = createStackNavigator({
  Map: MapScreen,
  Marker: MarkerScreen,
});

const TabNavigator = createBottomTabNavigator({
  Map: MapStack,
  Settings: SettingsScreen,
});

export const App = createAppContainer(TabNavigator);
