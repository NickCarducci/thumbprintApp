export const sendMessage = message => {
  return (dispatch, getState, {getFirebase, getFirestore} ) => {
    console.log("triggered")
    //const firebase = getFirebase();
    const firestore = getFirestore();
    //const { uid } = getState().auth;
    const profile = getState().profile;
    //const authorId = getState().firebase.auth.uid;
    //const { name } = getState().users[authorId] ? getState().users[authorId] : "_"

    //dispatch( sendMessageInProgress({ authorId, name, message}) );
    //console.log(message.authorId)
    const anonID = "anonID"
    const anon = "anon"
    firestore.collection("messages").add({
      eventroom: message.eventEdmID,
      message: message.text,
      authorId: message.authorId ? message.authorId : anonID,
      username: profile && profile.username ? profile.username : anon,
      date: new Date()
    }).then(ref => {
      console.log('document ID: ', ref.id)
    })
  };
};

export const deleteMessage = message => {
  return (dispatch, getState, {getFirebase, getFirestore} ) => {
    console.log("triggered")
    //const firebase = getFirebase();
    const firestore = getFirestore();
    firestore.collection("messages").doc(message).delete().then(ref => {
      console.log('deleted document')
    })
  };
};

/*export const retrieveMessage = ({ uid, displayName, message }) => {
  return {
    type: 'RETRIEVE_MESSAGE',
    uid,
    displayName,
    message
  }
};

export const sendMessageInProgress = (payload) => {
  return {
    type: 'SEND_MESSAGE',
    ...payload
  }
};

export const sendMessageSuccess = () => {
  return {
    type: 'SEND_MESSAGE_SUCCESS'
  }
};

export const sendMessageError = () => {
  return {
    type: 'SEND_MESSAGE_ERROR'
  }
};
export const newMessage = event => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      //make async call to database
      //const firebase = getFirebase();
      const firestore = getFirestore();
      //const profile = getState().profile;
      const authorId = getState().firebase.auth.uid;
      //const authTimeKey = authorId + "_" + event.date.getTime();
      firestore
        .collection("chatrooms")
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
        });
    };
  };*/
