import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import './App.css';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
      <HomePage/>
      <Switch>
        <Route exact path="/signup" render={() => <Signup/>}></Route>
      </Switch>
    </div>
  );
}

export default App;
