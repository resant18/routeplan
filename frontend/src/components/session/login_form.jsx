import React from "react";
import { Link, withRouter } from "react-router-dom";
import './login_form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.usernameSubmit = this.usernameSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // username field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  // username form submission
  usernameSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
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
    const demoUser = {
      email: 'abc@abc.com',
      password: 'aaaaaaaaaa'
    };

    return (
      <div id="form-container">
        <form id="session-form" onSubmit={this.usernameSubmit}>
          <div id="form-elements-container">
            <h1 className="form-title">Log in to RoutePlan</h1>
            <div id="input-container">
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
                className="form-input"
              />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
                className="form-input"
              />
            </div>
            <div className="submit-container">
              <input id="submit-btn" className="btn" type="submit" value="Submit" />
            </div>
            {this.renderErrors()}
          </div>
        </form>
        <ul className="bottom-form-link">
          <button id="submit-btn" className="btn" onClick={() => this.props.login(demoUser)}>Demo User</button>
          <Link id="toggle-form" className="btn" to={'/signup'} >Sign up for an account</Link>
        </ul>
      </div>
    );
  }
}

export default withRouter(LoginForm);
