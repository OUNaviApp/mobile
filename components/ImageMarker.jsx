import React from 'react';
import {Image} from 'react-native';
import {Marker} from 'react-native-maps';

export const ImageMarker = ({marker, onPress}) => {
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

  return (
    <Marker
      onPress={onPress}
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
  );
};
