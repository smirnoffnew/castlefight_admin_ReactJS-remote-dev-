import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';
import HeaderComponent from "./components/header";
import FooterComponent from "./components/footer";
// import Sidebar from "./components/sidebar";

import Home from "./containers/home";
import Content from "./containers/content";
import NotFound from "./containers/notFound";
import createBrowserHistory from 'history/createBrowserHistory'

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <HeaderComponent />
                {/*<Sidebar/>*/}
                <Router history={createBrowserHistory()}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/(knights|allies|enemies|levels|commons)" component={Content} />
                        <Route exact path="*" component={NotFound} />
                    </Switch>
                </Router>
                <FooterComponent />
            </div>
        );
    }
}

export default App;
