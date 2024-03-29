import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import HeaderComponent from "./components/common/header";
import FooterComponent from "./components/common/footer";
import Characters from "./containers/Characters";
import Levels from "./containers/Levels";
import EnemyWaves from "./containers/EnemyWaves";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";
import createBrowserHistory from 'history/createBrowserHistory'
import Alert from 'react-s-alert';
import './App.css';


class App extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <div className="App">
                    <HeaderComponent />
                    <Alert stack={{limit: 3}} timeout={2000} effect={'bouncyflip'}/>
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
        );
    }
}

export default App;
