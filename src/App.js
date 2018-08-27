import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import HeaderComponent from "./components/header";
import FooterComponent from "./components/footer";
// import Sidebar from "./components/sidebar";

import Content from "./containers/content";
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
                        <Route exact path="/(knights|allies|enemies|levels|settings)" component={Content} />
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
