import React from "react";
import "./profile.css";

class Profile extends React.Component {
  componentWillMount() {
    console.log(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {}

  componentDidMount() {
    this.props.requireUser(this.props.match.params.userId);
  }

  render() {
    if (this.props.users === undefined) {
      return null;
    }
    const { username, email } = this.props.users;

    return (
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="profile-title">
            <h1>Your profile!</h1>
          </div>

          <div className="profile-content">
            <div className="p-username">
              <div className="p-label">Username:</div>
              <div className="p-value">{username}</div>
            </div>
            <div className="p-email">
              <div className="p-label">Email:</div>
              <div className="p-value">{email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
