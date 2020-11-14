import React from 'react';
import { logout } from './auth-service';

class Profile extends React.Component {
  render() {
    return(
      <div>
        <p>{this.props.user.username}</p>
      </div>
    )
  }
}

export default Profile;