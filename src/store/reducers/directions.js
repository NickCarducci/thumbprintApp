const initialState = {}
export const location = ( state=initialState, action ) => {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        locationLocation: action.locationLocation
      })
    default:
      return state
  }
}
export const eventlocation = ( state=initialState, action ) => {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        eventLocation: action.eventLocation
      })
    default:
      return state
  }
}
/*
export const directions = ( state=initialState, action ) => {
  switch (action.type) {
    case 'ADD_PICKUP':
      return Object.assign({}, state, {
        pickup: action.pickupLocation
      })
    case 'ADD_DESTINATION':
      return Object.assign({}, state, {
        destination: action.destinationLocation
      })
    default:
      return state
  }
}*/
/*
export const zoom = ( state=initialState, action ) => {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        zoom: action.zoom
      })
    default:
      return state
  }
}*/