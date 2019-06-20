import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { Query } from 'react-apollo'
import Navigation from '../components/Navigation';
import Home from '../pages/Home';
import Footer from '../components/Footer';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Blogs from '../pages/Blogs';
import { CURRENT } from '../../apollo/Queries'
import store from '../../redux/store'
import { authenticateUser } from '../../redux/actions';
import PublicRoute from '../components/PublicRoute';
import PrivateRoute from '../components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
    <Query query={CURRENT}>
      {({ loading, error, data }) => {
          if(loading) return <div>Loading...</div>
          if(error) {
            store.dispatch(authenticateUser({}))
        }
        else{
          store.dispatch(authenticateUser(data.current))
       
        }
        return (
          <div className="App">
          <Router>
            <Navigation/>
            <main className="page landing-page">
            
            <Switch>
              <PublicRoute exact path="/" component={Home} />
              <Route exact path="/blogs" component={Blogs} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
            </Switch>
        
            </main>
          </Router>
          <Footer/>
        </div>
        )


      }}
    </Query>
    </Provider>
  );
}

export default App;
