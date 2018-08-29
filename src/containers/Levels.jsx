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
                .delete(`http://178.128.163.251:5555/v1/levels/summonCycles/${id}`, {})
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
            .get('http://178.128.163.251:5555/v1/levels/summonCycles')
            .then(response => {
                // console.log('response', response)
                let { data } = response;
                this.setState(() => {
                    data = data.map((value) => {
                        let output = [];
                        for (let item in value) {
                            let val = value[item]
                            output.push({ 'name': item, 'value': val })
                        }
                        return output
                    })
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

    addCycle = (content) => {
        let send = false
        content.map((item) => {
            if (item.name === 'id') {
                send = true
            }
        })
        if (send) {
            let output = {}
            content.map((item, index) => {
                if (typeof item.value === 'object') {
                    output[item.name] = {}
                    item.value.map((item2, index2) => {
                        let int = parseInt(item2.value, 10)
                        if (item.name === 'enemyIdsAndCount') {
                            output[item.name][index2] = { [item2.name]: int ? int : item2.value }
                        } else {
                            output[item.name][item2.name] = int ? int : item2.value
                        }
                    })
                } else {
                    let int = parseInt(item.value, 10)
                    output[item.name] = int ? int : item.value
                }
            })
            axios
                .post(`http://178.128.163.251:5555/v1/levels/enemyWaves`, { body: output })
                .then(() => this.getData())
                .catch(function (error) {
                    console.error(error);
                });
        }
        else
            console.error('this entity can\'t be edit/save due to lack of id')
    }

    // addCycle(data) {
    //     axios
    //         .post(
    //             'http://178.128.163.251:5555/v1/levels/summonCycles',
    //             data
    //         )
    //         .then(() => {
    //             console.log('done')
    //             this.closeModal();
    //             this.getData();
    //         })
    //         .catch((err) => {
    //             console.error('error', err)
    //         })
    // }

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

        // console.log('props', this.props)

        return (
            <div className="container">
                <h2 className="col-50">{this.state.entity}</h2>
                <div className="col-50 withButton">
                    <button onClick={this.openModal}>
                        Add Button
                    </button>
                </div>
                {
                    this.state.isLoaded
                        ?
                        <LevelTable
                            getData={this.getData}
                            content={this.state.data}
                            removeRecord={this.removeRecord}
                            entity={this.state.entity}
                            onEdit={this.addCycle}
                        />
                        :
                        <Loading />
                }
                <ModalForm
                    isOpen={this.state.modalIsOpen}
                    onEdit={this.addCycle}
                    closeModal={this.closeModal}
                />
            </div>
        )
    }
}

export default TableContainer;