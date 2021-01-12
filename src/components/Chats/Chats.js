import React from "react";
import ProfileSlider from "./ProfileSlider";
import search from ".././Icons/Images/search.png";
import { withRouter } from "react-router-dom";
//import Peer from "peerjs";
//import { sendChat } from "./Store";
import CDB from "./chatterdb";

import ".././Icons/Headerstyles.css";

import "./ProfileBackdrop.css";
import Chatter from "./Chatter";

/*
const Message = ({ msg }) => (
  <div>
      <img className="small-avatar top"
             source={{ uri: msg.author.avatar }} alt="error"/>
      <div className="vertical">
          <div className="horizontal space-between">
              <div>{msg.author.name}</div>
              <div>{msg.time - Date.now()}</div>
          </div>
          <div styleName="multiline">{msg.text}</div>
      </div>
  </div>
);

const MessageList = ({ messages, onLayout }) => (
  <div>
    {messages.map(msg => <Message msg={msg} />)}
  </div>
);*/
class Chats extends React.Component {
  constructor(props) {
    super(props);
    let db = new CDB();
    this.state = {
      db,
      profileOpen: false,
      userQuery: "",
      openUsers: [],
      openAChat: false,
      openUser: "",
      allChats: [],
      doitonce: false
    };
  }
  profileOpener = () => {
    this.setState({
      profileOpen: true
    });
  };
  profileCloser = () => {
    this.setState({
      profileOpen: false
    });
  }; /*
  componentWillUnmount = () => {
    //this.conn.close();
    if (window.peer) {
      window.peer.destroy();
    }
  };
  openPeer = x => {
    if (window.peer) {
      var outgoing = window.peer.connect(x);
      outgoing.on("open", () => {
        outgoing.send("hi, connection opened!");
      });
      outgoing.on("data", data => {
        // Will print 'hi!'
        if (outgoing) {
          this.setState({
            openUsers: [...this.state.openUsers, x]
          });
          outgoing.send(data);
        }
      });
    }
  };
  componentDidMount = () => {
    //PEER MOUNTED
    if (this.props.user) {
      this.peer = new Peer(
        String(this.props.user.data.username),
        {
          debug: 3,
          secure: true,
          host: "thumbprint.herokuapp.com",
          port: 443,
          config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }
          //path: '/myapp'
        },
        () => {
          console.log("peer mounted");
        }
      );

      this.peer.on("open", id => {
        this.openPeer(id);
        console.log("My PeerJS ID is:", id);
        console.log("Connected to:", id);
      });
      this.peer.on("error", err => {
        console.log(err);
        alert("" + err);
      });

      //WHEN DISCONNECTED
      //const conn = this.peer.connect(x);
      this.peer.on("close", () => {
        const result = window.confirm(
          "Connection destroyed. Press 'ok' to get back online"
        );
        if (result) this.peer = null;
        else alert("Refresh if you want to get online");
        console.log("Connection destroyed");
      });

      //WHEN CONNECTED
      this.peer.on("connection", conn => {
        //
        console.log("peer connected");
        conn.on("open", id => {
          console.log("conn open:" + id.id);
        });
        this.setState({
          runningConnection: true,
          openUsers: [...this.state.openUsers, conn.id]
        });

        conn.on("data", data => {
          // Will print 'hi!'
          conn.send(data);
        });
      });
    }
  };*/
  render() {
    //if (this.props.auth.uid) {
    //let profile = this.state.me !== "" && this.fireStore && this.fireStore.collection('users').doc(this.state.me.auth.uid)
    //console.log(this.state.me)
    console.log(this.state.openUsers);
    return (
      <div className={this.props.chatsopen ? "showchats" : "hidechats"}>
        <div className="chatter">
          <div //HEADERclassName="Chats_Header"
          >
            <img
              src="https://www.dl.dropboxusercontent.com/s/wef09yq3mgu8eif/profile1%20%281%29.png?dl=0"
              className="profile_pic"
              onClick={
                this.props.auth
                  ? this.profileOpener
                  : () => this.props.history.push("/login")
              }
              alt="error"
            />
            <form
              onSubmit={() => {
                return false;
              }}
            >
              <input
                onChange={e => this.setState({ userQuery: e.target.value })}
                className="Chats_Header"
                placeholder="Usernames"
              />
            </form>
            <img src={search} className="search" alt="error" />
            <img
              onClick={this.props.chatscloser}
              src="https://www.dl.dropboxusercontent.com/s/zw3yisjvrkdwm03/switch%20accounts%20icon%20%281%29.png?dl=0"
              className="switch_accounts"
              alt="error"
            />
            <img
              src="https://www.dl.dropboxusercontent.com/s/szxg897vw4bwhs3/filter%20%281%29.png?dl=0"
              className="filter"
              alt="error"
            />
          </div>

          <div
            className="listedUserQuery" //RECENT & QUERIED_FOR_USERS
          >
            {this.state.userQuery === "" ? "Open" : "Query"}
            {this.state.userQuery === "" || this.props.user
              ? null
              : "Sign in to view other usernames"}
            {this.state.userQuery === ""
              ? this.props.users &&
                this.props.users.length > 0 &&
                this.props.users.map(user => {
                  //return this.state.openUsers.includes(user.username) ? (
                  //<Link to={"/chats/" + user.username}>{user.username}</Link>
                  if (this.state.openUsers.includes(user.data.username)) {
                    return (
                      <div
                        className="chatname"
                        onClick={() => {
                          if (this.props.user) {
                            const x = user.data.username;
                            this.setState({
                              userChatOpened: x,
                              openAChat: true
                            });
                            return this.props.achatisopen();
                          }
                        }}
                      >
                        {this.props.user.data.username}
                        <span className="connectionsignalon">&#9679;</span>
                      </div>
                    );
                  } else return null;
                  //) : null
                })
              : this.props.users &&
                this.props.user &&
                this.props.users.map(user => {
                  return user.data.username.includes(this.state.userQuery) &&
                    this.props.user.data.username !== user.data.username ? (
                    //<Link to={"/chats/" + user.username}>{user.username}</Link>
                    <div
                      className="chatname"
                      onClick={() => {
                        if (this.props.user) {
                          const x = this.props.user.data.username;
                          this.setState({
                            userChatOpened: x,
                            openAChat: true
                          });
                          this.props.achatisopen();
                          //this.openPeer(x);
                        }
                      }}
                    >
                      {user.data.username}
                      <span className="connectionsignaloff">&#9675;</span>
                    </div>
                  ) : null;
                })}
            {/*&#9675;*/}
          </div>
          <ProfileSlider
            show={this.state.profileOpen}
            close={this.profileCloser}
            firebase={this.props.firebase}
            users={this.props.users}
            user={this.props.user}
            auth={this.props.auth}
            history={this.props.history}
            chatsopen={this.props.chatsopen}
          />
          <Chatter
            connectPeer={this.connectPeer}
            chosenTopic={this.chosenTopic}
            openAChat={this.state.openAChat}
            achatisopenfalse={this.props.achatisopenfalse}
            cc={() => this.setState({ openAChat: false })}
            user={this.props.user}
            db={this.state.db}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Chats);
/*
          outgoing.on("open", function() {
            outgoing.send("Already connected to another client");
            setTimeout(function() {
              outgoing.close();
            }, 500);
          });
          return;
        }*/
