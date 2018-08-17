import React, {Component} from 'react';
import logo from "../logo.svg";

class HeaderComponent extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">GameDash</h1>
            </header>
        );
    }
}

export default HeaderComponent;