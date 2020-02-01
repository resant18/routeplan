import React from "react";
import { Link, withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.usernameSubmit = this.usernameSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      let user2 = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.login(user2);
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  usernameSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.signup(user);
  }

  renderErrors() {
    return (
      <ul className="error-list">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div id="form-container">
        <form id="session-form" onSubmit={this.usernameSubmit}>
          <div id="form-elements-container">
            <h1 className="form-title">Sign up to RoutePlan</h1>
            <div id="input-container">
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
                className="form-input"
              />
              <input
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="username"
                className="form-input"
              />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
                className="form-input"
              />
              <input
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
                className="form-input"
              />
            </div>
            <div className="submit-container">
              <input
                id="submit-btn"
                className="btn"
                type="submit"
                value="Submit"
              />
            </div>
            {this.renderErrors()}
          </div>
        </form>
        <ul className="bottom-form-link">
          <Link id="toggle-form" className="btn" to={"/login"}>
            Already have an account? Log in
          </Link>
        </ul>
      </div>
    );
  }
}

export default withRouter(SignupForm);
