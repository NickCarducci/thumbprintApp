import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where
} from "firebase/firestore";
import firebase from ".././init-firebase.js";
import { Link } from "react-router-dom";
import { standardCatch } from "../Sudo.js";
import { PDB } from "../auth.js";
import Chats1 from ".././Chats1/index.js";
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  getDownloadURL
} from "firebase/storage";

const firestore = getFirestore(firebase);
export default class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: new PDB(),
      chats: [],
      newMessage: "",
      sendTitlePlan: ""
    };
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.entityId) {
      if (this.props.entityId !== prevProps.entityId) {
        onSnapshot(
          query(
            collection(firestore, "chats"),
            where(
              "threadId",
              "==",
              this.props.entityType + this.props.entityId
              //this.props.recipients.sort()
            ),
            orderBy("time"),
            limit(10)
          ),
          (querySnapshot) => {
            this.setState({
              chats: querySnapshot.docs.map(
                (doc) => doc.exists() && { ...doc.data(), id: doc.id }
              ),
              last: querySnapshot.docs[querySnapshot.docs.length - 1]
            });
          },
          (e) => console.log(e)
        );
      }
    } else {
      if (this.props.recipients !== prevProps.recipients) {
        console.log("getting chats", this.props.recipients);

        Promise.all(
          this.props.recipients.map(async (foo) => {
            var recipient = await this.props.hydrateUser(foo);

            return recipient && recipient;
          })
        ).then(async (recipientsProfiled) => {
          this.setState({ recipientsProfiled });
          onSnapshot(
            query(
              collection(firestore, "chats"),
              where(
                "threadId",
                "==",
                String(this.props.recipients).replaceAll(",", "")
              ),
              orderBy("time"),
              limit(10)
            ),
            (querySnapshot) => {
              console.log(querySnapshot.docs);
              this.setState({
                chats: querySnapshot.docs.map(
                  (doc) =>
                    doc.exists() && {
                      ...doc.data(),
                      id: doc.id,
                      recipientsProfiled
                    }
                ),
                last: querySnapshot.docs[querySnapshot.docs.length - 1]
              });
            },
            (e) => console.log(e)
          );
        });
      }
    }
  };
  paginate = (key) => {
    if (this.props.entityId) {
      onSnapshot(
        query(
          collection(firestore, "chats"),
          where(
            "threadId",
            "==",
            this.props.entityType + this.props.entityId
            //this.props.recipients.sort()
          ),
          orderBy("time"),
          key === "first"
            ? endBefore(this.state.first)
            : startAfter(this.state.last),
          limit(10)
        ),
        (querySnapshot) => {
          this.setState({
            first: querySnapshot.docs[0],
            last: querySnapshot.docs[querySnapshot.docs.length - 1],
            class: querySnapshot.docs
              .map((doc) => {
                return doc.exists() && { ...doc.data(), id: doc.id };
              })
              .filter((x) => x)
          });
        }
      );
    } else {
      onSnapshot(
        query(
          collection(firestore, "chats"),
          where(
            "threadId",
            "==",
            String(this.props.recipients).replaceAll(",", "")
          ),
          orderBy("time"),
          key === "first"
            ? endBefore(this.state.first)
            : startAfter(this.state.last),
          limit(10)
        ),
        (querySnapshot) => {
          this.setState({
            first: querySnapshot.docs[0],
            last: querySnapshot.docs[querySnapshot.docs.length - 1],
            class: querySnapshot.docs
              .map((doc) => {
                return doc.exists() && { ...doc.data(), id: doc.id };
              })
              .filter((x) => x)
          });
        }
      );
    }
  };
  render() {
    const { recipients } = this.props;
    let noteList = [];
    let noteTitles = [];
    //pushed
    this.props.notes &&
      this.props.notes.map((x) => {
        noteTitles.push(x.message);
        return noteList.push(x._id);
      });
    return (
      <div
        style={{
          width: "100%",
          display: this.props.chatsopen ? "block" : "none"
        }}
      >
        {this.props.entityId && this.props.entityType + this.props.entityId}
        {false && (
          <Chats1
            setApp={(e) => this.setState(e)}
            user={this.props.user}
            videos={this.state.videos}
            getVideos={async (pathReference) => {
              //this.loadGreenBlue("getting videos");
              //var listRef = this.storageRef.child(pathReference);

              await listAll(ref(getStorage(), pathReference))
                .then((res) => {
                  let p = 0;
                  //res._delegate.prefixes.forEach((folderRef) => folderRef.listAll());
                  Promise.all(
                    res /*._delegate*/.items
                      .map(async (reference) => {
                        return new Promise((r) =>
                          getMetadata(reference)
                            .then(async (metadata) => {
                              //var gsUrl = await reference.getDownloadURL();
                              const gsUrl = await getDownloadURL(reference);

                              if (gsUrl)
                                return r({
                                  ...reference,
                                  ...metadata,
                                  gsUrl,
                                  ref
                                });
                              // Metadata now contains the metadata for 'images/forest.jpg'
                            })
                            .catch(standardCatch)
                        );
                      })
                  ).then((videos) => {
                    console.log(videos.length + " videos downloaded ", videos);
                    //this.unloadGreenBlue();
                    this.setState({ videos });
                  });
                })
                .catch(standardCatch);
            }}
            getFolders={this.props.getFolders}
            loadGreenBlue={() => {}}
            unloadGreenBlue={() => {}}
            chatsopen={this.props.chatsopen}
            auth={this.props.auth}
            recentChats={this.state.chats}
            entityType={this.props.entityType}
            entityId={this.props.entityId}
            recipients={this.props.recipients}
          />
        )}
        <br />
        {this.state.last && (
          <div
            onClick={() => {
              this.paginate("last");
            }}
            style={{
              border: "1px solid",
              borderRadius: "3px",
              width: "min-content",
              margin: "4px 10px",
              padding: "4px"
            }}
          >
            back
          </div>
        )}
        {this.state.chats.map((x, i) => {
          var eventDate1 = new Date();
          if (x.date) {
            eventDate1 = new Date(x.date.seconds * 1000);
            eventDate1.setSeconds(0);
            eventDate1.setMilliseconds(0);
          }
          var datenotime = new Date();
          datenotime.setHours(
            eventDate1.getHours(),
            eventDate1.getMinutes(),
            0,
            0
          );
          var diffDays = Math.round(
            (datenotime.getTime() - eventDate1.getTime()) / 86400000
          );
          return (
            <div key={i}>
              <div>
                {[0, 30, 60, 90].includes(i) &&
                  new Date(x.time.seconds * 1000).toLocaleString()}
              </div>
              {x.date ? (
                <div
                  style={{
                    justifyContent: "space-between",
                    width: "300px",
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      fontSize: "15px",
                      backgroundColor:
                        diffDays > 0 ? "rgba(126, 126, 166,.5)" : "",
                      color: diffDays > 0 ? "white" : "rgb(146, 266, 176)"
                    }}
                  >
                    {eventDate1.toLocaleDateString()}
                  </div>
                  {diffDays === 0
                    ? ` today`
                    : diffDays === -1
                    ? ` tomorrow`
                    : diffDays === 1
                    ? ` yesterday`
                    : diffDays < 0
                    ? ` in ${Math.abs(diffDays)} days`
                    : ` ${diffDays} days ago`}
                  <br />
                  {
                    {
                      0: "su",
                      1: "mo",
                      2: "tu",
                      3: "we",
                      4: "th",
                      5: "fr",
                      6: "sa"
                    }[eventDate1.getDay()]
                  }
                  <br />
                  <div
                    style={{
                      bottom: "0px",
                      position: "absolute"
                    }}
                  >
                    {x.message}
                  </div>
                  <div
                    onClick={async () => {
                      //return console.log(note);
                      if (noteList.includes(x.id)) {
                        var deleteAll = window.confirm(
                          "Are you sure you want to delete this plan? " +
                            `${
                              this.props.auth !== undefined &&
                              x.authorId === this.props.auth.uid
                                ? "This also deletes you invites in chat with this plan." +
                                  " Nothing can be recovered after this"
                                : "It will have its original date when you " +
                                  `redownload it from the original author`
                            }`
                        );
                        if (deleteAll) {
                          deleteDoc(doc(firestore, "chats", x.id))
                            .then(async (ref) => {
                              console.log("deleted plan from messages " + x.id);
                              await this.state.db
                                .deleteNote({ _id: x.id })
                                .then(() => {
                                  console.log(
                                    "deleted plan from local " + x.id
                                  );
                                  this.getNotes();
                                })
                                .catch(standardCatch);
                            })
                            .catch(standardCatch);
                        }
                      } else {
                        var foo = await this.state.db["createNote"]({
                          ...x,
                          _id: x.id
                        });
                        foo && this.props.getNotes();

                        //this.props.navigate("/");
                      }
                    }}
                  >
                    {noteList.includes(x.id) ? (
                      <p style={{ opacity: ".5" }}>&#9733;</p>
                    ) : (
                      <p>&#9734;</p>
                    )}
                  </div>
                </div>
              ) : (
                <span
                  onClick={() => {
                    var answer = window.confirm("Do you want to delete this?");
                    answer && deleteDoc(doc(firestore, "chats", x.id));
                  }}
                >
                  {x.message}
                </span>
              )}
            </div>
          );
        })}
        {this.state.first && (
          <div
            onClick={() => {
              this.paginate("first");
            }}
            style={{
              border: "1px solid",
              borderRadius: "3px",
              width: "min-content",
              margin: "4px 10px",
              padding: "4px"
            }}
          >
            back
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.auth !== undefined &&
              addDoc(collection(firestore, "chats"), {
                authorId: this.props.auth.uid,
                message: this.state.newMessage,
                time: new Date(),
                threadId: this.state.entityid
                  ? this.props.entityId + this.state.entityType
                  : String(this.props.recipients).replaceAll(",", ""),
                recipients: this.props.recipients,
                entityId: this.props.entityId,
                entityType: this.props.entityType
              }).then(() => {
                console.log("recipients", this.props.recipients);
              });
          }}
        >
          <div
            onClick={() => {
              if (this.state.newMessage !== "") {
                var answer = window.confirm("remove progress?");
                if (answer) {
                  this.setState({ newMessage: "" });
                }
              } else if (this.state.sendTitlePlan === "") {
                this.setState({ newMessage: "reminder to " });
              }
            }}
            style={{
              boxShadow: "inset 0px 0px 5px 1px rgb(0,0,0)",
              display: "flex",
              position: "relative",
              maxWidth: "300px",
              width: "max-content",
              wordBreak: "break-all",
              height: "36px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "40px",
              padding: "5px 10px",
              color: "grey",
              backgroundColor: "rgb(200,200,250)",
              opacity:
                this.state.newMessage &&
                !this.state.newMessage.startsWith("reminder to ")
                  ? 0.5
                  : 1,
              fontSize: "18px"
            }}
          >
            {this.state.sendTitlePlan}
          </div>
          <Link
            //to="/new"
            to="/new"
            state={{
              sendTitlePlan: this.state.sendTitlePlan,
              entityId: this.props.entityId,
              entityType: this.props.entityType,
              recipients: this.props.recipients,
              topic: this.props.chosenTopic
            }}
            style={{
              textDecoration: "none",
              boxShadow: "inset 0px 0px 5px 1px rgb(0,0,0)",
              display: this.state.sendTitlePlan ? "flex" : "none",
              position: "relative",
              width: "max-content",
              height: "36px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "40px",
              padding: "5px 20px",
              color: "blue",
              backgroundColor: "rgb(200,200,250)",
              fontSize: "18px"
            }}
          >
            send as plan
          </Link>
          <div style={{ display: "flex" }}>
            <textarea
              style={{ textIndent: "4px" }}
              placeholder={
                this.props.auth === undefined ? "Login to chat" : "•••" //"Chat here"
              }
              value={this.state.newMessage}
              onChange={(e) => {
                var bee = e.target.value;
                if (
                  bee.toLowerCase().startsWith("reminder to") &&
                  bee.length > 12
                ) {
                  this.setState({
                    askIfPlan: true,
                    sendTitlePlan: bee.substring(
                      bee.lastIndexOf("reminder to") + 12,
                      bee.length
                    )
                  });
                } else if (this.state.askIfPlan) {
                  this.setState({ askIfPlan: false, sendTitlePlan: "" });
                }
                this.setState({ newMessage: bee });
              }}
              maxLength="1001"
            />
            <button
              type="submit"
              style={{
                zIndex: this.state.newMessage !== "" ? "0" : "-1",
                display: "flex",
                position: "relative",
                left: this.state.newMessage !== "" ? "0px" : "-56px",
                height: "36px",
                width: "max-content",
                padding: "0px 5px",
                backgroundColor: "white",
                color: "black",
                transition: ".3s ease-out"
              }}
            >
              Send it
            </button>
          </div>
        </form>
      </div>
    );
  }
}
