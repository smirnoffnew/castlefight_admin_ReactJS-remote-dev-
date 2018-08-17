import React, { Component } from 'react';
import './App.css';

import HeaderComponent from "./components/header";
// import Sidebar from "./components/sidebar";
import Content from "./containers/content";
import FooterComponent from "./components/footer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <HeaderComponent/>
          {/*<Sidebar/>*/}
          <Content/>
          <FooterComponent/>
      </div>
    );
  }
}

export default App;
