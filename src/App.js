import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import HeaderComponent from "./components/common/header";
import FooterComponent from "./components/common/footer";
// import Sidebar from "./components/sidebar";

import Characters from "./containers/Characters";
import Levels from "./containers/Levels";
import SummonCycles from "./containers/SummonCycles";
import EnemyWaves from "./containers/EnemyWaves";
import Settings from "./containers/Settings";
import NotFound from "./containers/notFound";

import createBrowserHistory from 'history/createBrowserHistory'

import './App.css';

class App extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <div className="App">
                    <HeaderComponent />
                    {/*<Sidebar/>*/}
                    <Switch>
                        <Route exact path="/(knights|allies|enemies)" component={Characters} />
                        <Route exact path="/levels" component={Levels} />
                        <Route exact path="/levels/summonCycles" component={SummonCycles} />
                        <Route exact path="/levels/enemyWaves" component={EnemyWaves} />
                        <Route exact path="/settings" component={Settings} />
                        <Redirect from="/" to="/knights" />
                        <Route exact path="*" component={NotFound} />
                    </Switch>
                    <FooterComponent />
                </div>
            </Router>
        );
    }
}

export default App;
