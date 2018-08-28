import React, { Component } from 'react';
import AddButton from "../components/addButton";
import Loading from "../components/loading";
import Table from "../components/Table";
import axios from "axios";

class TableContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            entity: '',
            tableComponentProps: {
                data: []
            }
        };
    }

    removeRecord = (entity, id) => {
        console.log('delete', entity, ' ', id);
        axios.delete(`http://178.128.163.251:5555/v1/${entity}/${id}`, {})
            .then(() => this.getData())
            .catch(function (error) {
                console.error(error);
            });
    };

    getData = () => {
        const slug = this.props.history.location.pathname.substr(1);
        console.log('slug', slug)
        axios.get('http://178.128.163.251:5555/v1/' + slug)
            .then(response => {
                const { data } = response;
                console.log('response', data)
                this.setState(() => ({
                    entity: slug,
                    isLoaded: true,
                    tableComponentProps: {
                        data: data,
                        columns: ['Name', 'Components', 'Edit', 'Delete'],
                    }
                }));
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps() {
        this.getData();
    }

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
    }
}

export default TableContainer;