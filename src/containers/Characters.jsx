import React, { Component } from 'react';
import AddButton from "../components/AddButton";
import Loading from "../components/common/loading";
import CharactersTable from "../components/CharactersTable";
import Helper from "../helper";
import axios from "axios";

class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            entity: '',
            abilities: [],
            rows: [],
            columns: ['Name', 'Components', 'Edit', 'Delete']
        };
        this.helper = new Helper();
    }

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps() {
        this.getData();
    };

    objectToArray = (objectData) => {
        return objectData
            ?
            Object.keys(objectData).map(key=>({
                uniqueId: this.helper.makeId(),
                nameInput: key,
                valueInput: objectData[key]
            }))
            :
            []
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
                this.setState((prevState) => ({
                    ...prevState,
                    entity: slug,
                    rows: response.data.map(entityItem=>(
                        {
                            ...entityItem,
                            components:entityItem.components.map(item=>{
                                return{
                                    ...item,
                                    uniqueId:this.helper.makeId(),
                                    values:this.objectToArray(item.values)
                                }
                            }),
                            uniqueId:this.helper.makeId()
                        }
                        )),
                }));
                return this.getAbilities();
            })
            .then((abilitiesResponse)=>{
                this.setState((prevState) => ({
                    ...prevState,
                    isLoaded: true,
                    abilities: abilitiesResponse.data.map(componentName=>{
                        return {
                            uniqueId: this.helper.makeId(),
                            type: componentName,
                            defaultValue: null,
                            values: [
                                {
                                    uniqueId: this.helper.makeId(),
                                    nameInput: 1,
                                    valueInput: 10
                                },
                                {
                                    uniqueId: this.helper.makeId(),
                                    nameInput: 2,
                                    valueInput: 20
                                },
                                {
                                    uniqueId: this.helper.makeId(),
                                    nameInput: 1,
                                    valueInput: 30
                                }
                            ]
                        }
                    })
                }));
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    getAbilities = () => {
        return axios.get('http://178.128.163.251:5555/v1/components')
    };


    render() {
        return (
            <div className="container">
                <h2 className="col-50">{this.state.entity}</h2>
                {
                    this.state.isLoaded
                        ?
                        <div>
                            <AddButton
                                abilities={this.state.abilities}
                                entity={this.state.entity}
                                getData={this.getData}
                            />
                            <CharactersTable
                                abilities={this.state.abilities}
                                entity={this.state.entity}
                                columns = {this.state.columns}
                                rows = {this.state.rows}
                                getData={this.getData}
                                removeRecord={this.removeRecord}
                            />
                        </div>
                        :
                        <Loading />
                }
            </div>
        )
    };
}

export default TableContainer;