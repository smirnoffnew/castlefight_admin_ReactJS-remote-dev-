import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ContentComponent extends Component {
    render() {

        console.log('props', this.props)

        return (
            <div className="container">
                <Link to='/knights'>knight</Link>
                <br />
                <Link to='/allies'>allies</Link>
                <br />
                <Link to='/enemies'>enemies</Link>
                <br />
                <Link to='/levels'>level</Link>
                <br />
                <Link to='/commons'>settings</Link>
            </div>
        );
    };
}

export default ContentComponent;