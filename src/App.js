import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import Home from './comps/home'
import Login from './comps/login'
import newUser from './comps/new-user'
import NewFriend from './comps/new-friends'
import Review from './comps/review'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={Home}/>
            <Route path='/login/:id' component={Login} />
            <Route path='/new-user' component={newUser} />
            <Route path='/new-friend/:id' component={NewFriend}/>
            <Route path='/review/:id' component={Review} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
