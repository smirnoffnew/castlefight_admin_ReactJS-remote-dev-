import React, { Component } from 'react';
import { withAlert } from "react-alert"
import LevelTable from "../components/Levels/LevelTable";
import LevelsModalForm from "../components/Levels/LevelsModalForm";
import Loading from "../components/common/loading";
import axios from "../axiosBaseUrlConfig";
import Helper from "../helper";

class Levels extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
        this.state = {
            isLoaded: false,
            modalIsOpen: false,
            backgrounds: [],
            companyActs: [],
            entity: '',
        };
    }

    getBackgrounds = () => axios.get('/levels/backgrounds/');

    getCompanyActs = () => axios.get('/levels/companyActs/');

    getLevels = () => axios.get('/levels');

    getData = () => {
        this.getLevels()
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
                                            outputObj.push({ 'name': val[item] ? val[item].type : 0, 'value': val[item] ? val[item].count : 0 })
                                        } else {
                                            outputObj.push({ 'name': item, 'value': val[item] })
                                        }
                                    }
                                    val = outputObj
                                }
                                output.push({ 'name': item, 'value': val })
                            }
                            return output
                        });
                        return {
                            isLoaded: true,
                            entity: this.props.history.location.pathname.substr(1),
                            data,
                        };
                    });
                return this.getBackgrounds();
            })
            .then((backgroundsResponse)=>{
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        backgrounds:backgroundsResponse.data.map(background=>({label:background, value:background}))
                    }
                });
                return this.getCompanyActs();
            })
            .then((companyActsResponse)=>{
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        companyActs:companyActsResponse.data.map(ActsResponse=>({label:ActsResponse, value:ActsResponse}))
                    }
                });
            })
            .catch( error => {
                console.error(error);
            });
    };

    removeRecord = (id) => {
        if (id)
            axios
                .delete(`/levels/${id}`, {})
                .then(() => {
                    this.props.alert.success(`${this.helper.getEntityNameByUrl(this.state.entity)} Successfully deleted!`);
                    this.getData();
                })
                .catch((error) => {
                    console.error(error);
                });
        else
            console.error('this entity can\'t be deleted due to lack of id')
    };



    addCycle = (content) => {
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
                        if (item.name === 'enemyWaveIds') {
                            output[item.name] = [item2.value]
                        } else if (item.name === 'enemyIdsAndCount') {
                            output[item.name][index2 + 1] = { 'type': item2.name, 'count': item2.value }
                        } else {
                            output[item.name][item2.name] = item2.value;
                        }
                    })
                } else {
                    output[item.name] = item.value;
                }
            });
            axios
                .post(`/levels`, output)
                .then(() => {
                    this.props.alert.success(`${this.helper.getEntityNameByUrl(this.state.entity)} Successfully saved!`);
                  this.getData()
                })
                .catch( error => {
                    console.error(error);
                });
        }
        else
            console.error('this entity can\'t be edit/save due to lack of id')
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
                            backgrounds={this.state.backgrounds}
                            companyActs={this.state.companyActs}
                            removeRecord={this.removeRecord}
                            entity={this.state.entity}
                            onSave={this.addCycle}
                        />
                        :
                        <Loading />
                }
                <LevelsModalForm
                    isOpen={this.state.modalIsOpen}
                    backgrounds={this.state.backgrounds}
                    companyActs={this.state.companyActs}
                    onSave={this.addCycle}
                    closeModal={this.closeModal}
                    emptyLevel
                />
            </div>
        )
    }
}

export default withAlert(Levels);
