import React from 'react';
import { withRouter } from 'react-router-dom';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  // Once the user has been authenticated, redirect to the root page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props
      .login(user, this.props.history)
      .then(() => {
        if (!this.props.errors.length) {
          this.props.closeModal();
          this.props.history.push('/');
        }
      })
      .then(() => this.props.fetchUserBoards(this.props.userId));
  }

  loginDemoUser() {
    let user = {
      email: 'pinner@pinners.com',
      password: 'password'
    };
    this.props
      .login(user, this.props.history)
      .then(() => {
        if (!this.props.errors.length) {
          this.props.closeModal();
          this.props.history.push('/');
        }
      })
      .then(() => this.props.fetchUserBoards(this.props.userId));
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form'>
            <input
              type='text'
              value={this.state.email}
              onChange={this.update('email')}
              placeholder='Email'
            />
            <input
              type='password'
              value={this.state.password}
              onChange={this.update('password')}
              placeholder='Password'
            />
            <input type='submit' value='Login' />
            <button onClick={this.loginDemoUser}>Demo</button>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
