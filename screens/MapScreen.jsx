import React, {useState} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import {useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import {ImageMarker} from '../components/ImageMarker';
import {MarkerCreationModal} from './MarkerCreationModal';

export const MapScreen = () => {
  const [touchLocation, setTouchLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    deltaLatitude: 0.001,
    deltaLongitude: 0.001,
  });

  const [creationVisibility, setCreationVisibility] = useState(false);

  const navigation = useNavigation();

  const onLongPress = e => {
    const {longitude, latitude} = e.nativeEvent.coordinate;
    setTouchLocation({
      longitude,
      latitude,
    });
    setCreationVisibility(true);
  };

  const onMarkerPress = marker => () => {
    navigation.push('Marker', marker);
  };

  const markers = useSelector(state => state.markerReducer.markers);

  const onRegionChange = e => {
    setRegion(e);
  };

  const closeMarkers = markers.filter(marker=>{
    const {latitude, longitude} = region;
    const MAX_DISTANCE = 0.1;
    const distance = Math.pow(marker.latitude - latitude, 2) + Math.pow(marker.longitude - longitude, 2);
    return distance < MAX_DISTANCE;
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MapView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        showsUserLocation
        followsUserLocation
        onLongPress={onLongPress}
        onRegionChange={onRegionChange}>
        {closeMarkers.map(marker => (
          <ImageMarker
            marker={marker}
            key={marker.id}
            onPress={onMarkerPress(marker)}
          />
        ))}
      </MapView>
      <MarkerCreationModal
        visible={creationVisibility}
        location={touchLocation}
        onRequestClose={() => setCreationVisibility(false)}
      />
    </View>
  );
};

MapScreen.navigationOptions = {
  header: null,
};
