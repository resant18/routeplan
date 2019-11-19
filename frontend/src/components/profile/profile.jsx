import React from "react";


class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.currentUser.id);
    // this.props.fetchUserTweets(this.props.currentUser.id);
  }

  componentWillReceiveProps(newState) {
    // this.setState({ tweets: newState.tweets });
  }

  render() {
    return (
      <h1>{this.props.currentUser.handle}</h1>
    )
  }
}

export default Profile;
