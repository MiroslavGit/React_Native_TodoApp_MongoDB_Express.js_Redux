import React from "react";
import { Scene, Router } from "react-native-router-flux";
import Login from "./../Login/Login";
import Main from "./../Main/Main";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="login" component={Login} title="Login" initial />
      <Scene key="main" component={Main} title="Main" />
    </Router>
  );
};

export default RouterComponent;
