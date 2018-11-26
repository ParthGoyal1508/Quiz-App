import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Afterlogin from './containers/Afterlogin';
import Viewuser from './containers/Viewuser';
import Deleteuser from './containers/Deleteuser';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Addque from './containers/Addque';
import Deleteque from './containers/Deleteque';
import Viewquiz from './containers/Viewquiz';
import Deletequiz from './containers/Deletequiz';
import Updateque from './containers/Updateque';
import Logout from './containers/Logout';
import Playquiz from './containers/Playquiz';
import Startquiz from './containers/Startquiz';
import Leaderboard from './containers/Leaderboard';


class App extends Component {
  constructor(){
    super();
    this.state ={
    loginstate:localStorage.getItem('Email'),
    }
  }
  render() {
    return (
      <div>
        <Router>
          <div>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/Signup' component={Signup} />
                <Route exact path='/Afterlogin' component={Afterlogin} />
                <Route exact path='/addque' component={Addque} />
                <Route exact path='/deleteque' component={Deleteque} />
                <Route exact path='/viewuser' component={Viewuser} />
                <Route exact path='/deleteuser' component={Deleteuser} />
                <Route exact path='/viewquiz' component={Viewquiz} />
                <Route exact path='/deletequiz' component={Deletequiz} />
                <Route exact path='/updateque/:id' component={Updateque} />
                <Route exact path='/logout' component={Logout}/>
                <Route exact path='/playquiz' component={Playquiz}/>
                <Route exact path='/playquiz/:genrename/:quizno' component={Startquiz}/>
                <Route exact path='/leaderboard' component={Leaderboard}/>
              </Switch>
          </div>
        </Router>
         }
         </div>
    );
  }
}

export default App;
