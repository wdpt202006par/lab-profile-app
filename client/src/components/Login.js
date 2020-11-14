import React from 'react';
import { login } from './auth-service';

class Login extends React.Component {
  state = { 
    username: '',
    password: ''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    login(username, password)
      .then(response => {
        this.setState({username: "", password: ""});
        this.props.updateUser(response)
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={this.state.username} onChange={e => this.handleChange(e)}/>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" is="password" value={this.state.password} onChange={e => this.handleChange(e)}/>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;