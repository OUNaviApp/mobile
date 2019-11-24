import React, {useState} from 'react';
import {
  View,
  Image,
  Alert,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import uuid from 'uuid/v4';

export const MapScreen = () => {
  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState({});
  const [creationDialogVisibility, setCreationDialogVisibility] = useState(
    false,
  );

  const openMarkerDialog = e => {
    setNewMarker({
      ...e.nativeEvent.coordinate,
      id: uuid(),
      title: '',
      description: '',
      type: '',
    });
    setCreationDialogVisibility(true);
  };

  const createMarker = marker => {
    setCreationDialogVisibility(false);
    setMarkers(markers => markers.concat(marker));
    setNewMarker({});
  };

  const onMarkerPress = marker => () => {
    Alert.alert('You tapped marker ID', marker.id);
  };

  const getImage = type => {
    switch (type) {
      case 'Elevator':
        return require('../assets/green-e.png');
      case 'Ramp':
        return require('../assets/green-r.png');
      case 'Hazard':
        return require('../assets/red-!.png');
    }
  };

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
        onLongPress={openMarkerDialog}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            onPress={onMarkerPress(marker)}
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
        ))}
      </MapView>
      <Modal
        visible={creationDialogVisibility}
        transparent
        animationType="fade">
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.85,
              height: 500,
              backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'column',
              padding: 10,
            }}>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 10}}>
              Create New Marker
            </Text>
            <View
              style={{
                width: '100%',
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 14}}>Title</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'black',
                  width: '100%',
                  fontSize: 24,
                }}
                placeholder="Title"
                value={newMarker.title}
                onChangeText={title =>
                  setNewMarker(marker => ({
                    ...marker,
                    title,
                  }))
                }
              />
            </View>
            <View
              style={{
                width: '100%',
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 14}}>Description</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'black',
                  width: '100%',
                  fontSize: 18,
                  maxHeight: 180
                }}
                placeholder="Description"
                value={newMarker.description}
                multiline
                onChangeText={description =>
                  setNewMarker(marker => ({
                    ...marker,
                    description,
                  }))
                }
              />
            </View>
            <View>
              {['Elevator', 'Ramp', 'Hazard'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setNewMarker(marker => ({...marker, type}))}
                  style={{
                    backgroundColor:
                      newMarker.type === type ? '#00694E' : '#FFE4B9',
                    padding: 5,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: newMarker.type === type ? 'white' : 'black',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{flex: 1}} />
            <TouchableOpacity
              onPress={() => createMarker(newMarker)}
              style={{
                backgroundColor: '#00694E',
                padding: 5,
                paddingVertical: 10,
                borderRadius: 5,
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
