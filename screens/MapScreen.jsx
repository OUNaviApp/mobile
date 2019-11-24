import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Alert,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import MapView, {Marker} from 'react-native-maps';
import uuid from 'uuid/v4';

export const MapScreen = () => {
  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState({});
  const [creationDialogVisibility, setCreationDialogVisibility] = useState(
    false,
  );

  const navigation = useNavigation();

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
    navigation.push("Marker", marker)
  };

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

  const readyToSubmit =
    newMarker.title &&
    newMarker.title.length > 0 &&
    newMarker.description.length > 0 &&
    newMarker.type !== '';

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
          <TouchableWithoutFeedback
            onPress={() => setCreationDialogVisibility(false)}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              width: Dimensions.get('window').width * 0.85,
              height: 500,
              backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'column',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 28, fontWeight: 'bold', marginBottom: 10}}>
                Create New Marker
              </Text>
              <TouchableOpacity
                onPress={() => setCreationDialogVisibility(false)}
                style={{
                  padding: 10,
                  paddingRight: 0,
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    lineHeight: 28,
                    fontWeight: 'bold',
                  }}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>
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
                  maxHeight: 180,
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
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {['Elevator', 'Ramp', 'Hazard', 'Escalator'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setNewMarker(marker => ({...marker, type}))}
                  style={{
                    backgroundColor:
                      newMarker.type === type ? '#00694E' : '#FFE4B9',
                    padding: 5,
                    paddingVertical: 10,
                    borderRadius: 5,
                    margin: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '45%',
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
                opacity: readyToSubmit ? 1 : 0.3,
              }}
              disabled={!readyToSubmit}>
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

MapScreen.navigationOptions = {
  header: null,
}
