import React, {Component} from 'react';
import CharactersFormItem from "./CharactersFormItem";
import Helper from "../helper";
import axios from 'axios';


class CharactersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abilities: [
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
            ],
            name: this.props.name,
            components: this.props.components
        };
        this.helper = new Helper();
    }

    componentDidMount() {
    }

    formatComponentsData = (components) => {
        return components.map((item) => {
            let values = {};
            item.values.forEach((inputItem) => {
                values[inputItem.name] = inputItem.value;
            });
            delete  item.uniqueId;
            return {...item, values}
        });

    };

    getAbilities = () => {
        axios
            .get('http://178.128.163.251:5555/v1/knights/abilities')
            .then(response => console.log(response));
    };


    addSkillItem = (e) => {
        let generateNewFormElement = {
            ...this.state.abilities[0],
            uniqueId: this.helper.makeId(),
        };

        this.setState((prevState) => ({
                components: [
                    ...prevState.components,
                    {...generateNewFormElement}
                ]
            })
        );

        this.setSelect(generateNewFormElement.uniqueId, this.state.abilities[0])
    };

    deleteSkillItem = (id) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.filter(item => item.uniqueId !== id)]
            }
        });
    };

    onSelectSkillItem = (componentId, selectedValue) => {
        let componentSelect = this.state.abilities.filter(item => selectedValue.target.value === item.type)[0];
        this.setSelect(componentId, componentSelect);
    };

    setSelect = (componentId, componentSelect) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((item) => {
                    if (item.uniqueId === componentId) {
                        let newInputArray = Object.keys(componentSelect.values).map((key) => {
                            return {
                                name: key,
                                value: componentSelect.values[key],
                                uniqueId: this.helper.makeId(),
                            }
                        });
                        return {
                            ...item,
                            values: newInputArray,
                            type: componentSelect.type
                        }
                    } else {
                        return item;
                    }
                })]

            }
        })
    };

    addValueInput = (componentId) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((item) =>
                    item.uniqueId === componentId
                        ?
                        {...item, values: [...item.values, {name: "2", value: 1234, uniqueId: this.helper.makeId()}]}
                        :
                        item
                )]
            }
        });
    };

    deleteValueInput = (componentId, inputId) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((item) =>
                    item.uniqueId === componentId
                        ?
                        {...item, values: item.values.filter(item => item.uniqueId !== inputId)}
                        :
                        item
                )]
            }
        });
    };

    changeValueInput = (componentId, inputId, e, param) => {
        let eventTargetValue = e.target.value;
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((item) => {
                    if (item.uniqueId === componentId) {
                        return {
                            ...item,
                            values: item.values.map(
                                (inputItem) =>
                                    inputItem.uniqueId === inputId
                                        ?
                                        param === 'name' ? {...inputItem, name: eventTargetValue} : {
                                            ...inputItem,
                                            value: eventTargetValue
                                        }
                                        :
                                        inputItem
                            ),
                        }
                    } else {
                        return item;
                    }
                })]
            }
        });
    };

    saveForm = (e) => {
        e.preventDefault();
        let url = this.props.editFlag
            ?
            `http://178.128.163.251:5555/v1/knights/${this.state.name}`
            :
            `http://178.128.163.251:5555/v1/knights`;

        axios
            .post(url,
                {
                    "components": this.formatComponentsData(this.state.components),
                    "name": this.state.name
                })
            .then(() => {
                this.props.getData();
                this.props.closeModal();
            })

    };

    changeInputNameValue = (e) => {
        let value = e.target.value;
        this.setState(prevState => ({...prevState, name: value}));
    };


    render() {
        return (
            <div>
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adding hero skills</h5>
                        </div>
                        <div className="modal-body">
                            <button type="reset" onClick={this.addSkillItem}>Add++</button>
                            <div className="new-inputs">
                                <label style={{'marginRight': '15px'}}>Name:</label>
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={(e) => this.changeInputNameValue(e)}
                                />
                            </div>
                            <hr/>
                            {
                                this.state.components.map((item) =>
                                    (<CharactersFormItem
                                        key={this.helper.makeId()}
                                        data={item}
                                        abilities={this.state.abilities}

                                        deleteSkillItem={() => this.deleteSkillItem(item.uniqueId)}
                                        onSelectSkillItem={this.onSelectSkillItem}

                                        addValueInput={() => this.addValueInput(item.uniqueId)}
                                        deleteValueInput={this.deleteValueInput}
                                        changeValueInput={this.changeValueInput}
                                    />)
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="reset" onClick={this.saveForm} className="btn btn-save">Save</button>
                            <button type="reset" className="btn btn-close" data-dismiss="modal"
                                    onClick={this.props.closeModal}>Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CharactersForm;