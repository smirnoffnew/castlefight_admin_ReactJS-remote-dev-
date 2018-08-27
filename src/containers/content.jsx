import React, { Component } from 'react';
import Table from "../components/Table";
import AddButton from "../components/addButton";
import Helper from "../helper";
import axios from "axios";

const helper = new Helper;

class ContentComponent extends Component {
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
        switch (slug) {
            //     case 'levels':

            //         return axios
            //             .get('http://178.128.163.251:5555/v1/' + slug)
            //             .then(response => {
            //                 const { data } = response;
            //                 console.log('response', response)
            //                 this.setState(() => {
            //                     return {
            //                         isLoaded: true,
            //                         entity: slug,
            //                         tableComponentProps: {
            //                             data: data.map((entityItem) => {
            //                                 console.log('entityItem', entityItem)
            //                                 return { ...entityItem };
            //                             })
            //                         }
            //                     };
            //                 });
            //             })
            //             .catch(function (error) {
            //                 console.error(error);
            //             });

            case 'settings':
                const trueSlug = 'commons/farm'
                console.log('trueSlug', trueSlug)
                return axios
                    .get('http://178.128.163.251:5555/v1/' + trueSlug)
                    .then(response => {
                        const { data } = response;
                        console.log('response', data)
                        this.setState(() => {
                            let output = [], i = 0;
                            for (let i in data) {
                                let value = data[i]
                                if (i == 'farmIndexAndPositions') {
                                    output[i] = []
                                    for (let val in value) {
                                        output[i].push(<div>{'' + value[val].x + ' ' + value[val].y}</div>)
                                    }
                                } else if (typeof value === 'object') {
                                    output[i] = []
                                    for (let val in value) {
                                        output[i].push(<div>{value[val]}</div>)
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

            default:
                return axios
                    .get('http://178.128.163.251:5555/v1/' + slug)
                    .then(response => {
                        const { data } = response;
                        console.log('response', data)
                        this.setState(() => ({
                            isLoaded: true,
                            entity: slug,
                            tableComponentProps: {
                                data: data.map((entityItem) => {
                                    console.log('entityItem', entityItem)
                                    let components = entityItem.components.map((componentItem) => {
                                        let values = Object
                                            .keys(componentItem.values ? componentItem.values : [])
                                            .map(key =>
                                                ({
                                                    name: key,
                                                    value: componentItem.values[key],
                                                    uniqueId: helper.makeId()
                                                })
                                            );
                                        return { ...componentItem, values, uniqueId: helper.makeId() }
                                    });
                                    return { ...entityItem, components };
                                }),
                                columns: ['Name', 'Components', 'Edit', 'Delete'],
                            }
                        }));
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
        }
    };

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps() {
        this.getData();
    }

    render() {

        console.log('props', this.state.tableComponentProps)

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
                        <div className="sk-fading-circle">
                            <div className="sk-circle1 sk-circle"></div>
                            <div className="sk-circle2 sk-circle"></div>
                            <div className="sk-circle3 sk-circle"></div>
                            <div className="sk-circle4 sk-circle"></div>
                            <div className="sk-circle5 sk-circle"></div>
                            <div className="sk-circle6 sk-circle"></div>
                            <div className="sk-circle7 sk-circle"></div>
                            <div className="sk-circle8 sk-circle"></div>
                            <div className="sk-circle9 sk-circle"></div>
                            <div className="sk-circle10 sk-circle"></div>
                            <div className="sk-circle11 sk-circle"></div>
                            <div className="sk-circle12 sk-circle"></div>
                        </div>
                }
            </div>
        );
    };
}

export default ContentComponent;