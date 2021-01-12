const message = (state, action) => {
  switch (action.type) {
      case 'ADD_MESSAGE':
          return {
              id: action.id,
              text: action.text,
              time: action.time,
              author: action.author
          }
      case 'SEND_MESSAGE':
          let msg = {
              text: action.text,
              time: Date.now(),
              author: {
                  name: action.user.name,
                  avatar: action.user.avatar
              }
          };
          const newMsgRef = firebase.database()
                                    .ref('messages')
                                    .push();
          msg.id = newMsgRef.key;
          newMsgRef.set(msg);
          return msg;
      default:
          return state
  }
}