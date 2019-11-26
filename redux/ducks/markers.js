const CREATE_MARKER = 'markers/CREATE_MARKER';
const DELETE_MARKER = 'markers/DELETE_MARKER';
const EDIT_MARKER = 'markers/EDIT_MARKER';

const defaultState = {
  markers: [],
}

export default function reducer(state = defaultState, action = {}) {
  const {payload, type} = action;
  switch (type) {
    case CREATE_MARKER:
      return {
        ...state,
        markers: state.markers.concat(payload),
      };
    case EDIT_MARKER:
      return {
        ...state,
        markers: state.markers.map(marker => {
          if (marker.id === payload.id) {
            return payload;
          }
          return marker;
        }),
      };
    case DELETE_MARKER:
      return {
        ...state,
        markers: state.markers.filter(m => m.id === payload.id),
      };
    default:
      return state;
  }
}

export const createMarker = marker => {
  return {
    type: CREATE_MARKER,
    payload: marker,
  };
};

export const editMarker = marker => {
  return {
    type: EDIT_MARKER,
    payload: marker,
  };
};

export const deleteMarker = marker => {
  return {
    type: DELETE_MARKER,
    payload: marker,
  }
}