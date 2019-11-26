import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styled from 'styled-components';

const Label = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  background-color: #ececec;
  padding: 0 10px;
`;

const Value = styled(Text)`
  font-size: 18px;
  padding: 0 10px;
`;

export const MarkerScreen = ({navigation}) => {
  const getImage = type => {
    switch (type) {
      case 'Elevator':
      case 'Escalator':
        return require('../assets/green-e.png');
      case 'Ramp':
        return require('../assets/green-r.png');
      case 'Hazard':
        return require('../assets/red-!.png');
    }
  };

  const marker = navigation.state.params;

  return (
    <View style={{ flex:1 }}>
      <MapView
        style={{
          width: '100%',
          height: 200,
        }}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        showsUserLocation>
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}>
          <Image
            source={getImage(marker.type)}
            style={{
              width: 50,
              height: 50,
              transform: [{translateY: -25}],
            }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
      <ScrollView style={{flex:1}}>
        <Label>Title</Label>
        <Value style={{marginBottom: 14}}>{marker.title}</Value>
        <Label>Description</Label>
        <Value>{marker.description}</Value>
      </ScrollView>
    </View>
  );
};

MarkerScreen.navigationOptions = ({navigation}) => ({
  title: navigation.state.params.type,
});
