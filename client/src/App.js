import React from 'react';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Route exact component={Home} path='/' />
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register} />
      </Router>
    </React.Fragment>
    
  );
}

export default App;
