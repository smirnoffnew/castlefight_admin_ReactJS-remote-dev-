import React, { Component } from 'react';
import AddButton from "../components/addButton";
import Loading from "../components/loading";
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
        const trueSlug = 'commons/farm'
        console.log('trueSlug', trueSlug)
        axios.get('http://178.128.163.251:5555/v1/' + trueSlug)
            .then(response => {
                const { data } = response;
                console.log('response', data)
                this.setState(() => {
                    let output = [], i = 0;
                    for (let item in data) {
                        let value = data[i]
                        if (i == 'farmIndexAndPositions') {
                            output[item] = []
                            for (let val in value) {
                                output[item].push(<div>{'' + value[val].x + ' ' + value[val].y}</div>)
                            }
                        } else if (typeof value === 'object') {
                            output[item] = []
                            for (let val in value) {
                                output[item].push(<div>{value[val]}</div>)
                            }
                        } else {
                            output.push(<div>{value}</div>)
                        }
                        i++
                    }

                    console.log('output', output)

                    return {
                        isLoaded: true,
                        entity: slug,
                        tableComponentProps: {
                            data: output,
                            columns: [
                                'Farm Index And Costs',
                                'Farm Index And Outputs',
                                'Farm Index And Positions',
                                'Initial Farm Count',
                                'Edit',
                                'Delete'
                            ],
                        }
                    };
                });
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
                    false // this.state.isLoaded
                        ?
                        'Working in progress'
                        :
                        <Loading />
                }
            </div>
        )
    }
}

export default TableContainer;