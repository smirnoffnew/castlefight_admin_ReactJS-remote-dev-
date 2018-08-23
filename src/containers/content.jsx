import React, {Component} from 'react';
import KnightsTable from "../components/knightsTable";
import AddButton from "../components/addButton";

const axios = require("axios");

class ContentComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            entity: 'knights',
            tableComponentProps: {
                data: [],
                columns: []
            }

        }
    }

    removeRecord = (entity, id) => {
        console.log('delete', entity, ' ', id);
        axios.delete(`http://178.128.163.251:5555/v1/${entity}/${id}`)
            .then(() => this.getData(this.state.entity))
            .catch(function (error) {
                console.error(error);
            });
    };

    getData = (param) => {
        switch(param) {
            case 'knights':
            return axios.get('http://178.128.163.251:5555/v1/knights')
                    .then(response => {
                        this.setState(() => {
                            return {
                                isLoaded: true,
                                entity: 'knights',
                                tableComponentProps: {
                                    data: response.data,
                                    columns: ['Name', 'Components', 'Edit', 'Delete'],
                                }
                            };
                        });
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
        }
    };

    componentDidMount() {
        this.getData(this.state.entity);
    };

    renderSwitch = (param) => {
        switch(param) {
            case 'knights':
                return <KnightsTable content = {this.state.tableComponentProps}
                                       removeRecord = {this.removeRecord}
                                       entity = {this.state.entity}/>;
            default:
                return  <KnightsTable content = {this.state.tableComponentProps}
                                        removeRecord = {this.removeRecord}
                                        entity = {this.state.entity}/>;
        }
    };

    render() {
        return (
            <div className="container">
                <h2 className="col-50">{this.state.entity}</h2>
                <AddButton/>
                {
                    this.state.isLoaded
                    ?
                    this.renderSwitch(this.state.entity)
                    :
                    <h1>LOADING...</h1>
                }
            </div>
        );
    };
}

export default ContentComponent;