import React, { Component } from 'react';
import { withAlert } from "react-alert"
import LevelTable from "../components/Waves/WavesTable";
import ModalForm from "../components/Waves/WavesModal";
import Loading from "../components/common/loading";
import axios from "../axiosBaseUrlConfig";
import Helper from "../helper";

class EnemyWaves extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
        this.state = {
            isLoaded: false,
            modalIsOpen: false,
            entity: '',
            tableComponentProps: {
                data: []
            }
        };
    }

    onEdit = (content) => {
        let send = false;
        content.forEach((item) => {
            if (item.name === 'id') {
                send = true
            }
        });
        if (send) {
            let output = {};
            content.forEach((item) => {
                if (typeof item.value === 'object') {
                    output[item.name] = {};
                    item.value.forEach((item2, index2) => {
                        if (item.name === 'enemyIdsAndCount') {
                            output[item.name][index2 + 1] = { 'type': item2.name, 'count': item2.value }
                        } else {
                            output[item.name][item2.name] = item2.value;
                        }
                    })
                } else {
                    output[item.name] = item.value
                }
            });
            axios
                .post(`/enemyWaves`, output)
                .then(() => {
                    this.props.alert.success(`${this.helper.getEntityNameByUrl(this.state.entity)} Successfully saved!`);
                    this.getData();
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else
            console.error('this entity can\'t be edit/save due to lack of id')
    };

    removeRecord = (id) => {
        if (id)
            axios
                .delete(`/enemyWaves/${id}`, {})
                .then(() => {
                    this.props.alert.success(`${this.helper.getEntityNameByUrl(this.state.entity)} Successfully deleted!`);
                    this.getData();
                })
                .catch(function (error) {
                    console.error(error);
                });
        else
            console.error('this entity can\'t be deleted due to lack of id')
    };

    getData = () => {
        axios
            .get('/enemyWaves')
            .then(response => {
                let { data } = response;
                if (data)
                    this.setState(() => {
                        data = data.map((value) => {
                            let output = [];
                            for (let item in value) {
                                let val = value[item];
                                if (typeof val === 'object') {
                                    let outputObj = [];
                                    for (let item in val) {
                                        if (typeof val[item] === 'object') {
                                            outputObj.push({ 'name': val[item].type, 'value': val[item].count })
                                        } else {
                                            outputObj.push({ 'name': item, 'value': val[item] })
                                        }
                                    }
                                    val = outputObj
                                }
                                output.push({ 'name': item, 'value': val })
                            }
                            return output;
                        });
                        return {
                            isLoaded: true,
                            entity: this.props.history.location.pathname.substr(1),
                            data,
                        };
                    });
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps() {
        this.getData();
    };

    render() {
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
                            onEdit={this.onEdit}
                        />
                        :
                        <Loading />
                }
                <ModalForm
                    isOpen={this.state.modalIsOpen}
                    onSave={this.onEdit}
                    closeModal={this.closeModal}
                    emptyWaves
                />
            </div>
        )
    }
}

export default withAlert(EnemyWaves);
