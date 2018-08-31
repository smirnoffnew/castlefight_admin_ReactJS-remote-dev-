import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import HeaderComponent from "./components/common/header";
import FooterComponent from "./components/common/footer";
// import Sidebar from "./components/sidebar";

import Characters from "./containers/Characters";
import Levels from "./containers/Levels";
import EnemyWaves from "./containers/EnemyWaves";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";

import createBrowserHistory from 'history/createBrowserHistory'
import './App.css';

const options = {
  timeout: 5000,
  position: "top right"
};



class App extends Component {
    render() {
        return (
          <AlertProvider template={AlertTemplate} {...options}>
            <Router history={createBrowserHistory()}>
                <div className="App">
                    <HeaderComponent />
                    {/*<Sidebar/>*/}
                    <Switch>
                        <Route exact path="/(knights|allies|enemies|abilities)" component={Characters} />
                        <Route exact path="/levels" component={Levels} />
                        <Route exact path="/enemyWaves" component={EnemyWaves} />
                        <Route exact path="/settings" component={Settings} />
                        <Redirect from="/" to="/knights" />
                        <Route exact path="*" component={NotFound} />
                    </Switch>
                    <FooterComponent />
                </div>
            </Router>
          </AlertProvider>
        );
    }
}

export default App;
