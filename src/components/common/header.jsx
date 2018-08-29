import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class HeaderComponent extends Component {
    render() {
        return (
            <header className="App-header">
                <Link to='/knights'>knight</Link>
                {' | '}
                <Link to='/allies'>allies</Link>
                {' | '}
                <Link to='/enemies'>enemies</Link>
                {' | '}
                <Link to='/levels'>level</Link>
                {' | '}
                <Link to='/settings'>settings</Link>
            </header>
        );
    }
}

export default HeaderComponent;