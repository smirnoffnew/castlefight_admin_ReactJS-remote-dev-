import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LevelTable from "../components/levelTable";
import ModalForm from "../components/levelsModal";
import Loading from "../components/common/loading";
import axios from "axios";

class TableContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            modalIsOpen: false,
            entity: '',
            tableComponentProps: {
                data: []
            }
        };
    }

    removeRecord = (id) => {
        if (id)
            axios
                .delete(`http://178.128.163.251:5555/v1/levels/enemyWaves/${id}`, {})
                .then(() => this.getData())
                .catch(function (error) {
                    console.error(error);
                });
        else
            console.error('this entity can\'t be deleted due to lack of id')
    };

    getData = () => {
        const slug = this.props.history.location.pathname.substr(1);
        axios
            .get('http://178.128.163.251:5555/v1/levels/enemyWaves')
            .then(response => {
                let { data } = response;
                let output = [];
                this.setState(() => {
                    data = data.map((value) => {
                        for (let item in value) {
                            let val = value[item]
                            if (typeof val === 'object') {
                                let outputObj = {}
                                for (let item in val) {
                                    if (typeof val[item] === 'object') {
                                        outputObj[val[item].type] = val[item].count
                                    } else {
                                        outputObj[item] = val[item]
                                    }
                                }
                                val = outputObj
                            }
                            output.push({ 'name': item, 'value': val })
                        }
                        return output
                    })

                    console.log('data', data)
                    return {
                        isLoaded: true,
                        entity: slug,
                        data: data,
                    };
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    addEnemyWaves(data) {
        axios
            .post(
                'http://178.128.163.251:5555/v1/levels/enemyWaves',
                data
            )
            .then(() => {
                console.log('done')
                this.closeModal();
                this.getData();
            })
            .catch((err) => {
                console.error('error', err)
            })
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
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
                <div className="col-50 withButton">
                    <button onClick={this.openModal}>
                        Add Button
                    </button>
                </div>
                <div>
                    <Link to='/levels'>levels</Link>
                    {' | '}
                    <Link to='/levels/summonCycles'>summonCycles</Link>
                    {' | '}
                    <Link to='/levels/enemyWaves'>enemyWaves</Link>
                </div>
                {
                    this.state.isLoaded
                        ?
                        <LevelTable
                            getData={this.getData}
                            content={this.state.data}
                            removeRecord={this.removeRecord}
                            entity={this.state.entity}
                        />
                        :
                        <Loading />
                }
                <ModalForm
                    isOpen={this.state.modalIsOpen}
                    onSave={this.addEnemyWaves}
                    closeModal={this.closeModal}
                    values={this.state.data}
                />
            </div>
        )
    }
}

export default TableContainer;