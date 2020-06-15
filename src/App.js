import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Test from './components/Test';
import './App.css';
import { useSelector} from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {

  const user = useSelector(user => user);

  return (
    <Route
      {...rest}
      render={(props) => user.logged === true
        ? <Component {...props} />
        : <Redirect to='/signup' />}
    />
  )
}

function App() {

  return (
      <Switch>
        <Route exact path="/" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <PrivateRoute path="/test" component={Test}></PrivateRoute>
      </Switch>
  );
}

export default App;
