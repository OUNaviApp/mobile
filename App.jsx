import React from 'react';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {MapScreen} from './screens/MapScreen';
import {MarkerScreen} from './screens/MarkerScreen';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/es/integration/react';

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

const Container = createAppContainer(TabNavigator);

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Container />
    </PersistGate>
  </Provider>
);
