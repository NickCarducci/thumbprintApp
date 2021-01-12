import { GeoFirestore } from "geofirestore";
export const createEvent = event => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    //const firebase = getFirebase();
    const firestore = getFirestore();
    //const profile = getState().profile;
    //const authorId = getState().firebase.auth.uid;
    //const authTimeKey = authorId + "_" + event.date.getTime();
    /*firestore
      .collection("planner")
      .add({
        title: event.title,
        body: event.body,
        chosenPhoto: event.chosenPhoto,
        date: event.date,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        address: event.address,
        location: event.location,
        city: event.city,
        etype: event.etype,
        geopoint: event.geopoint
      })
      .then(() => {
        dispatch({ type: "CREATE_EVENT", event });
      })
      .catch(err => {
        dispatch({ type: "CREATE_EVENT_ERROR", err });
      });*/

    const geoFirestore = new GeoFirestore(firestore);
    const geocollection = geoFirestore.collection("planner");
    geocollection.add({
      name: "Geofirestore",
      score: 100,
      // The coordinates field must be a GeoPoint!
      coordinates: event.geopoint,
      title: event.title,
      body: event.body,
      chosenPhoto: event.chosenPhoto,
      date: event.date,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      address: event.address,
      location: event.location,
      city: event.city,
      etype: event.etype,
      geopoint: event.geopoint
    });
  };
};

export const editEvent = (event, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    const idstring = JSON.stringify(id);
    const geoFirestore = new GeoFirestore(firestore);
    const geocollection = geoFirestore.collection("planner");
    geocollection
      .doc(idstring)
      .update({
        ...event,
        updatedAt: new Date()
      })
      .then(() => {
        dispatch({ type: "EDIT_EVENT", event });
      })
      .catch(err => {
        dispatch({ type: "EDIT_EVENT_ERROR", err });
      });
  };
};

export const removeProject = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const geoFirestore = new GeoFirestore(firestore);
    const geocollection = geoFirestore.collection("planner");
    geocollection
      .collection("planner")
      .doc(id)
      .delete();
  };
};
export const addEdmtoCal = event => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    //const firebase = getFirebase();
    const firestore = getFirestore();
    const profile = getState().profile;
    const authorId = getState().firebase.auth.uid;
    //const authTimeKey = authorId + "_" + event.date.getTime();
    firestore
      .collection("users")
      .doc(authorId)
      .update({
        starredEdm: [...profile.starredEdm, event.id]
      })
      .then(() => {
        dispatch({ type: "CREATE_EVENT", event });
      })
      .catch(err => {
        dispatch({ type: "CREATE_EVENT_ERROR", err });
      });
  };
};
export const rmEdmfromCal = event => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    //const firebase = getFirebase();
    const firestore = getFirestore();
    const profile = getState().profile;
    const authorId = getState().firebase.auth.uid;
    //const authTimeKey = authorId + "_" + event.date.getTime();
    firestore
      .collection("users")
      .doc(authorId)
      .update({
        starredEdm: profile.starredEdm.filter((_, i) => i !== event.id)
      })
      .then(() => {
        dispatch({ type: "CREATE_EVENT", event });
      })
      .catch(err => {
        dispatch({ type: "CREATE_EVENT_ERROR", err });
      });
  };
};
