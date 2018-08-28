import React, { Component } from 'react';
import AddButton from "../components/addButton";
import Loading from "../components/loading";
import Table from "../components/Table";
import axios from "axios";

class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            entity: '',
            tableComponentProps: {
                data: []
            }
        };
    }

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps() {
        this.getData();
    };

    removeRecord = (entity, id) => {
        axios
            .delete(`http://178.128.163.251:5555/v1/${entity}/${id}`, {})
            .then(() => this.getData())
            .catch(function (error) {
                console.error(error);
            });
    };

    getData = () => {
        const slug = this.props.history.location.pathname.substr(1);
        axios
            .get('http://178.128.163.251:5555/v1/' + slug)
            .then(response => {
                this.setState(() => ({
                    entity: slug,
                    isLoaded: true,
                    tableComponentProps: {
                        data: response.data,
                        columns: ['Name', 'Components', 'Edit', 'Delete'],
                    }
                }));

                console.log('response.data',  response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    getColumn = () => {
        return  ['Name', 'Components', 'Edit', 'Delete'];
    };

    getRows = () => {
        return this.state.tableComponentProps.data;
    };



    render() {
        return (
            <div className="container">
                <h2 className="col-50">{this.state.entity}</h2>
                <AddButton getData={this.getData} />
                {
                    this.state.isLoaded
                        ?
                        <Table
                            getData={this.getData}
                            content={this.state.tableComponentProps}
                            removeRecord={this.removeRecord}
                            entity={this.state.entity}
                        />
                        :
                        <Loading />
                }
            </div>
        )
    };
}

export default TableContainer;