import React from 'react';
import {signup} from './auth-service';


class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        campus: '',
        course: ''
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault(); // bloque le comportement du formulaire
        const {username, password, campus, course} = this.state;
        signup(username, password, campus, course)
        .then(data => {
            this.setState({
                username: '',
                password: '',
                campus: '',
                course: ''
            })
            //this.props.updateUser(data)
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label>Password:</label>
                    <input
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                    />
                    <label>Campus:</label>
                    <select name="campus"
                        value={this.state.campus}
                        onChange={(e) => this.handleChange(e)}>
                        <option value = "Madrid">Madrid</option>
                        <option value = "Barcelona">Barcelona</option>
                        <option value = "Miami">Miami</option>
                        <option value = "Paris">Paris</option>
                        <option value = "Berlin">Berlin</option>
                        <option value = "Amsterdam">Amsterdam</option>
                        <option value = "Mexico">Mexico</option>
                        <option value = "Sao Paulo">Sao Paulo</option>
                        <option value = "Lisbon">Lisbon</option>  
                    </select>

                    <label>Course:</label>
                    <select name="course"
                        value={this.state.course}
                        onChange={(e) => this.handleChange(e)}>
                        <option value = "Web-dev">Web Dev</option>
                        <option value = "Ux-ui">Ux/Ui</option>
                        <option value = "Data-analytics">Data analytics</option> 
                    </select>
                    <button>I Signup</button>
                </form>
            </div>
        )
    }

}

export default Signup;