import React, { Component } from 'react';
import AddButton from "../components/addButton";
import Loading from "../components/loading";

class ContentComponent extends Component {
    render() {
        return (
            <div className="container">
                <h2 className="col-50">{this.props.entity}</h2>
                <AddButton getData={this.props.getData} />
                {
                    this.props.isLoaded
                        ?
                        this.props.children
                        :
                        <Loading />
                }
            </div>
        );
    };
}

export default ContentComponent;