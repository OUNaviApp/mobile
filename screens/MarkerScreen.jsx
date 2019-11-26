import React from 'react';
import {View, Alert, Text, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {ImageMarker} from '../components/ImageMarker';
import { useNavigation } from 'react-navigation-hooks';

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
  const id = navigation.state.params.id;

  const marker = useSelector(state =>
    state.markerReducer.markers.find(m => m.id === id),
  );

  if(!marker){
    Alert.alert("Marker no longer exists");
    navigation.goBack();
    return null;
  }

  return (
    <View style={{flex: 1}}>
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
        <ImageMarker marker={marker} key={marker.id} />
      </MapView>
      <ScrollView style={{flex: 1}}>
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
