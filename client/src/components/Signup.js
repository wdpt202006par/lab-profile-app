import React from 'react';
import {signup} from './auth-service';

class Signup extends React.Component {
  state = { 
    username: '',
    password: '',
    campus: '',
    course: ''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const campus = this.state.campus;
    const course = this.state.course;

    signup(username, password, campus, course)
      .then(response => {
        this.setState({username: "", password: "", campus: "", course: ""});
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
          <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" is="password" value={this.state.password} onChange={this.handleChange}/>
          <label htmlFor="campus">Campus</label>
          <select name="campus" id="campus" value={this.state.campus} onChange={this.handleChange}>
            <option value="">Select campus</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Miami">Miami</option>
            <option value="Paris">Paris</option>
            <option value="Berlin">Berlin</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="México">México</option>
            <option value="Sao Paulo">Sao Paulo</option>
            <option value="Lisbon">Lisbon</option>
          </select>
          <label htmlFor="">Course</label>
          <select name="course" id="course" value={this.state.course} onChange={this.handleChange}>
            <option value="">Select course</option>
            <option value="Web Dev">Web Dev</option>
            <option value="UX/UI">UX/UI</option>
            <option value="Data Analytics">Data Analytics</option>
          </select>
          <button>Signup</button>
        </form>
      </div>
    )
  }
}

export default Signup;