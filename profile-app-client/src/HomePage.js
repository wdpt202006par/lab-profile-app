import React from 'react';
import Signup from './components/Signup';
import {Link} from 'react-router-dom';


class HomePage extends React.Component {
    render() {
        return(
            <div>
                <button>
                    <Link to='/signup'> Signup </Link>
                </button>
                <button>
                    <Link to='/login'> Login </Link>
                </button>
            </div>
        )
    }
}

export default HomePage;