import React from 'react';
import { Link } from 'react-router-dom'

function HomePage() {
  return(
    <div>
      <h1>IronProfile</h1>
      <h5>Today we will create an app with authorization, adding some cool style.</h5>
      <Link to="/signup">
        <p>Sign up</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
    </div>
  )
}

export default HomePage;