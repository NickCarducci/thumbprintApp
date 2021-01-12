import React from "react";
import back from "../Icons/Images/back777.png";

class Chatter extends React.Component {
  state = {
    allChats: [{ [this.props.conn]: [] }]
  };
  sendChat = async ({ authorId, recipient, message, topic }) => {
    console.log(authorId + recipient);
    //socket.emit("chat message", message);
    let res = await this.state.db["saveChat"]({
      authorId,
      recipient,
      message,
      topic
    });
    return console.log(res);
  };
  componentDidMount = async () => {
    const loadedMessages = await this.props.db.getAllNotes();
    //console.log(loadedMessages);
    let done = [];
    this.setState({ loadedMessages });
    Object.keys(loadedMessages).map(keyName => {
      done.push(loadedMessages[keyName]);
      return done;
    });
    this.setState({ done });
    this.props.db &&
      this.state.allChats &&
      done.map(n => {
        const authorId = n.note.authorId;
        const recipient = n.note.recipient;
        const message = n.note.message;
        const topic = n.note.topic;
        if (topic === this.state.chosenTopic) {
          return this.setState({
            allChats: [...this.state.allChats, { topic: { authorId, message } }]
          });
        } else {
          return this.setState({
            allChats: [
              [...this.state.allChats],
              { [topic]: [this.state.chosenTopic, { authorId, message }] }
            ]
          });
        }
      });
  };
  render() {
    const { user } = this.props;
    const topics = this.state.allChats && Object.keys(this.state.allChats);
    //if (topics) {
    return (
      <div
        className={
          this.props.openAChat ? "enclosechatter" : "enclosechatterhide"
        }
      >
        <div className="dash">
          <div className="topicsbox">
            <div>
              <div>{this.props.chosenTopic}</div>
              {/*topics.map(thing => (
                <div onClick={() => this.setState({ chosenTopic: thing })}>
                  {thing}
                </div>
              ))*/}
            </div>
            <div type="submit" className="sendbutton">
              Send
            </div>
          </div>

          <div className="chatbox">
            <form
              onSubmit={e => {
                e.preventDefault();
                return false;
              }}
            >
              <input
                onChange={e => this.setState({ chosenTopic: e.target.value })}
                className="chattitle"
                value={this.state.chosenTopic}
                placeholder={this.state.chosenTopic}
              />
            </form>

            <img
              onClick={() => {
                this.props.cc();
                this.props.achatisopenfalse();
                //this.conn.close();
                //this.peer.destroy();
              }}
              src={back}
              alt="error"
              className="backgochat"
            />
            <div
              className="enclosechats"
              /*onClick={() =>
                  this.props.peer.on("disconnected", () =>
                    this.props.peer.reconnect(this.openUser)
                  )
                }*/
            >
              {this.state.allChats &&
                this.state.allChats[this.state.chosenTopic] &&
                this.state.allChats[this.state.chosenTopic].map(message => (
                  <div>
                    {message.authorId}:{message.message}
                  </div>
                ))}
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                this.sendChat({
                  authorId: this.props.user.data.username,
                  recipient: this.state.openUser,
                  message: this.state.message,
                  topic: this.state.chosenTopic
                });
                this.setState({ message: "" });
              }}
            >
              <input
                className="chatinput"
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
              />
            </form>
          </div>
        </div>
      </div>
    );
    //} else return null;
  }
}
export default Chatter;
