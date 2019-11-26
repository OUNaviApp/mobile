import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import uuid from 'uuid/v4';
import {useDispatch} from 'react-redux';
import { createMarker } from '../redux/ducks/markers';

export const MarkerCreationModal = ({visible, onRequestClose, location}) => {
  const [marker, setMarker] = useState({
    id: '',
    title: '',
    description: '',
    type: '',
  });

  useEffect(() => {
    if (visible) {
      setMarker({
        ...location,
        id: uuid(),
        title: '',
        description: '',
        type: '',
      });
    }
  }, [visible]);

  const readyToSubmit =
    marker.title &&
    marker.title.length > 0 &&
    marker.description.length > 0 &&
    marker.type !== '';

  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <TouchableWithoutFeedback
          onPress={onRequestClose}>
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
            <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 10}}>
              Create New Marker
            </Text>
            <TouchableOpacity
              onPress={onRequestClose}
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
              value={marker.title}
              onChangeText={title =>
                setMarker(marker => ({
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
              value={marker.description}
              multiline
              onChangeText={description =>
                setMarker(marker => ({
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
                onPress={() => setMarker(marker => ({...marker, type}))}
                style={{
                  backgroundColor:
                    marker.type === type ? '#00694E' : '#FFE4B9',
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
                    color: marker.type === type ? 'white' : 'black',
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
            onPress={() => {
              dispatch(createMarker(marker));
              onRequestClose();
            }}
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
  );
};
