import React from 'react';
// Routing Components
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './Context/auth';
import AuthRoute from './util/AuthRoute'

// Styling 
import 'semantic-ui-css/semantic.min.css';
import './App.css';

// Apollo client
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory'
// client Creation
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return { headers: { authorization: token ? `Bearer ${token}`  : '' } }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:5500/'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client} >
        <div className='ui container'>
          <Router >
            <Navbar />
            <Route exact component={Home} path='/' />
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/register' component={Register} />
          </Router>
        </div>

      </ApolloProvider>
    </AuthProvider>

  );
}

export default App;
