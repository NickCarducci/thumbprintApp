import React from "react";
import { fireStore } from "../../init-firebase";

class PostersStore extends React.Component {
  finishStripeVendor = async () => {
    fireStore
      .collection("users")
      .doc(this.props.auth.uid)
      .update({
        vendorId: vendorId
      });
    //if (vendor.state === key) {
    /*await fetch(
        "https://us-central1-thumbprint-1c31n.cloudfunctions.net/createStripeVendor",
        {
          method: "POST",
          //credentials: "include",
          headers: {
            "Content-Type": "Application/JSON",
            "Access-Control-Request-Method": "POST"
          },
          body: JSON.stringify({ vendorId: authId }),
          maxAge: 3600
          //"mode": "cors",
        }
      )
        .then(async response => await response.json())
        .then(body => {
          console.log(body);
          this.setState({ vendorId: body });
        })
        .catch(err => {
          console.log(err);
        });*/
    //} else {return console.log("State keys for Stripe & initial get are not the same"
  };

  render() {
    console.log(window.location.pathname);
    console.log(`/posters/${this.props.auth.uid}`);
    return (
      <div className="showPostersStore">
        <div>This is your profile</div>
        {window.location.pathname === `/posters/${this.props.auth.uid}` &&
        this.props.auth.uid &&
        this.props.user.data.vendorId ? (
          <div>
            {this.props.state === this.props.key ? (
              <div>
                <div>Creating stripe account...</div>
                <div onClick={this.finishStripeVendor}>
                  Click to finish stripe connect
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <div class="horizontal-scroll-wrapper squares">
              <div>Tickets</div>
              <div>Events</div>
              <div>Jobs</div>
              <div>Housing</div>
              <div>Clubs</div>
              <div>Shops</div>
              <div>Restaurants</div>
              <div>Bars</div>
              <div>Services</div>
              <div>Proposals</div>
            </div>
            <div>List Items Posted by {this.props.auth.uid} in Category</div>
          </div>
        )}
      </div>
    );
  }
}
export default PostersStore;
