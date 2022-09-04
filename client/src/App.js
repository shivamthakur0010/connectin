import React,{useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import {Routes} from './components/routing/Routes'
import "./App.css";
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './action/auth';
import setAuthToken from './utils/setAuthToken'


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);


  return (
    <>
    <Provider store ={store}>
      <Router>
        <Navbar/>
        <Switch>
         <Route exact path = '/' component = {Landing}/>
          <Route component = {Routes}/>
        </Switch>
         
      </Router>
      </Provider>
    </>
  );
};

export default App;
