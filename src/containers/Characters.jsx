import React, { Component } from 'react';
import AddButton from "../components/addButton";
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
                    abilities: abilitiesResponse
                }));
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    getAbilities = () => {
        //return axios.get('http://178.128.163.251:5555/v1/knights/abilities')
        let mockData = [
            {
                "type": "com.anygames.castlefight.components.Hp",
                "defaultValue": null,
                "values": {
                    "10": 20.0,
                    "2": 30.0,
                    "3": 40.0
                }
            },

            {
                "type": "com.anygames.castlefight.components.Speed",
                "defaultValue": null,
                "values": {
                    "11": 60.0,
                    "2": 70.0,
                    "3": 10.0
                }
            },

            {
                "type": "com.anygames.castlefight.components.Cooldown",
                "defaultValue": null,
                "values": {
                    "12": 60.0,
                    "2": 70.0,
                    "3": 10.0
                }
            },

            {
                "type": "com.anygames.castlefight.components.MeleeDps",
                "defaultValue": null,
                "values": {
                    "13": 60.0,
                    "2": 70.0,
                    "3": 10.0
                }
            },

            {
                "type": "com.anygames.castlefight.components.Prefab",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.Cost",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.NumberPercentage",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.MeleeAttackRadius",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.SummonCost",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.ProjectileSpeed",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.RangeDps",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.MaxGoldReward",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.Aps",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.RestoreHpPerSec",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.Name",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.UpgradeCost",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.PumpkinRewardChancePercentage",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.ThresholdCompanyLevel",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.Distance",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.MinGoldReward",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.MapComponent",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.RangeAttackRadius",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.MaxOE",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.MaxPumpkinReward",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.MinPumpkinReward",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.Time",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            },

            {
                "type": "com.anygames.castlefight.components.GoldRewardChancePercentag",
                "defaultValue": null,
                "values": {
                    "1": 50.0,
                    "2": 60.0,
                    "3": 70
                }
            }
        ];
        return new Promise( (resolve)=>resolve(
                mockData.map(item=>(
                    {
                        ...item,
                        values:this.objectToArray(item.values),
                        uniqueId:this.helper.makeId()
                    })
                )

            )
        );
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