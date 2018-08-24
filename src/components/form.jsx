import React, {Component} from 'react';
import Skills from "./skills";

const axios = require("axios");

class FormComponent extends Component {
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
            skills: [
                {
                    uniqueId: this.makeid(),
                    type: "com.anygames.castlefight.components.Hp",
                    defaultValue: null,
                    values: [
                        {
                            name: "1",
                            value: '20.0',
                            uniqueId: this.makeid()
                        },
                        {
                            name: "2",
                            value: "30",
                            uniqueId: this.makeid()
                        }
                    ]
                }
            ],
        }

        let trueData =

            {
                "components": [
                    {
                        "type": "com.anygames.castlefight.components.Hp",
                        "defaultValue": null,
                        "values": {
                            "1": 20.0,
                            "2": 30.0,
                            "3": 40.0
                        }
                    },

                    {
                        "type": "com.anygames.castlefight.components.Speed",
                        "defaultValue": null,
                        "values": {
                            "1": 30.0,
                            "2": 70.0,
                            "3": 10.0
                        }
                    },

                    {
                        "type": "com.anygames.castlefight.components.Cooldown",
                        "defaultValue": null,
                        "values": {
                            "1": 60.0,
                            "2": 70.0,
                            "3": 10.0
                        }
                    },

                    {
                        "type": "com.anygames.castlefight.components.MeleeDps",
                        "defaultValue": null,
                        "values": {
                            "1": 60.0,
                            "2": 70.0,
                            "3": 10.0
                        }
                    }
                ],
                "name": "PoorKnight"
            };
    }
    configData = () => {
        let componentTrueStructure = [];
        this.state.skills.forEach((item) => {
            let valuesObject = {};
            let trueItem = {};
            item.values.forEach((inputItem) => {
                valuesObject[inputItem.name] = inputItem.value;
            });

            trueItem.type = item.type;
            trueItem.defaultValue = item.defaultValue;
            trueItem.values = valuesObject;
            componentTrueStructure.push(trueItem);
        });
        return componentTrueStructure;
    }

    getAbilities = () => {
        axios
            .get('http://178.128.163.251:5555/v1/knights/abilities')
            .then( response => console.log(response));

    }

    componentDidMount(){
    }

    makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    addSkillItem = (e) => {
        this.setState( (prevState) =>  ({
                skills: [
                    ...prevState.skills,
                    { name: "", uniqueId:this.makeid(), values:[] }
                ]
            })
        );
    };

    deleteSkillItem = (id) => {
        this.setState((prevState) => {
            return{
                skills: [...prevState.skills.filter(item => item.uniqueId !== id)]
            }
        });
    };

    onSelectSkillItem = (componentId, selectedValue) => {
        let selectId = selectedValue.target.value;
        let componentSelect = this.state.abilities.filter( item => selectId === item.type )[0];
        this.setState((prevState) => {
            return{
                skills: [...prevState.skills.map((item) => {
                    if (item.uniqueId === componentId) {
                        let newInputArray = Object.keys(componentSelect.values).map((key)=>{

                            return {name:key, value:componentSelect.values[key], uniqueId: this.makeid()
                            }
                        });
                        return {
                            ...item,
                            values: newInputArray

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
                skills: [...prevState.skills.map((item) =>
                    item.uniqueId === componentId
                    ?
                    {...item, values: [...item.values, {name: "2", value:  1234, uniqueId: this.makeid()}]}
                    :
                    item
                )]
            }
        });
    };

    deleteValueInput = (componentId, inputId) => {
        this.setState((prevState) => {
            return {
                skills: [...prevState.skills.map((item) =>
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
                skills: [...prevState.skills.map((item) => {
                    if (item.uniqueId === componentId) {
                        return {
                            ...item,
                            values: item.values.map(
                                (inputItem) =>
                                    inputItem.uniqueId === inputId
                                        ?
                                        param === 'name' ? {...inputItem, name: eventTargetValue} : {...inputItem, value: eventTargetValue}
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
        console.log('+++++++++++++++++++++++save++++++++++++++++++++++++++', e.target);
        console.log('+++++++++++++++++++++++save++++++++++++++++++++++++++',this.configData());
        e.preventDefault();

        axios.post(`http://178.128.163.251:5555/v1/knights`,
            {
                "components": this.configData(),
                "name": "PoorKnight"
            })
            .then(res => {
                console.log('-------------------------------SAVED----------------------------------', res);
            })

    }

    render() {
        let {skills} = this.state;

        return (
            <div>
                <form >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adding hero skills</h5>
                        </div>
                        <div className="modal-body">
                            <button type="reset" onClick={this.addSkillItem}>Add++</button>
                            <hr/>
                            {
                                skills.map((item, idx) => {
                                    return (
                                        <Skills
                                            key={idx}
                                            idx = {idx}
                                            deleteSkillItem = {() => this.deleteSkillItem(item.uniqueId)}
                                            onSelectSkillItem = {this.onSelectSkillItem}

                                            changeValueInput = { this.changeValueInput }
                                            addValueInput = {() => this.addValueInput(item.uniqueId)}
                                            deleteValueInput = {this.deleteValueInput}

                                            data = {item}
                                            abilities = {this.state.abilities}
                                        />
                                    )
                                })
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

FormComponent.propTypes = {};

export default FormComponent;