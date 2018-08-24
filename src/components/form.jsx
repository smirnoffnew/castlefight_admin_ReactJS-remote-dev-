import React, {Component} from 'react';
import KnightFormItemComponent from "./knightFormItemComponent";
import axios from 'axios';

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
            name: this.props.name,
            components: this.props.components
        };
    }

    // configData = (components) => {
    //    return components.map((item) => {
    //
    //         let values = {};
    //
    //         item.values.forEach((key) => {
    //             values[inputItem.name] = inputItem.value;
    //         });
    //
    //         return {...item, values}
    //     });
    //
    // }

    getAbilities = () => {
        axios
            .get('http://178.128.163.251:5555/v1/knights/abilities')
            .then( response => console.log(response));
    }

    componentDidMount(){
    }

    makeid() {
        let text = "FormComponent";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    addSkillItem = (e) => {
        let generateNewFormElement = {
            ...this.state.abilities[0],
            uniqueId:this.makeid(),
        };

        this.setState( (prevState) =>  ({
            components: [
                    ...prevState.components,
                    {...generateNewFormElement }
                ]
            })
        );

        this.setSelect(generateNewFormElement.uniqueId, this.state.abilities[0])
    };

    deleteSkillItem = (id) => {
        this.setState((prevState) => {
            return{
                components: [...prevState.components.filter(item => item.uniqueId !== id)]
            }
        });
    };

    onSelectSkillItem = (componentId, selectedValue) => {
        let componentSelect = this.state.abilities.filter(item => selectedValue.target.value === item.type )[0];
        this.setSelect(componentId, componentSelect);
    };

    setSelect = (componentId, componentSelect) => {
        this.setState((prevState) => {
            return{
                components: [...prevState.components.map((item) => {
                    if (item.uniqueId === componentId) {
                        let newInputArray = Object.keys(componentSelect.values).map((key)=>{
                            return {
                                name:key,
                                value:componentSelect.values[key],
                                uniqueId: this.makeid(),
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
    }

    addValueInput = (componentId) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((item) =>
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
        console.log('+++++++++++++++++++++++save++++++++++++++++++++++++++',this.state);
        e.preventDefault();

        axios.post(`http://178.128.163.251:5555/v1/knights`,
            {
                "components": this.state.components,
                "name": this.state.name
            })
            .then(res => {
                console.log('-------------------------------SAVED----------------------------------', res);
            })

    };

    render() {
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
                                this.state.components.map((item) =>
                                   (<KnightFormItemComponent
                                        key={this.makeid()}
                                        data = {item}
                                        abilities = {this.state.abilities}

                                        deleteSkillItem = {() => this.deleteSkillItem(item.uniqueId)}
                                        onSelectSkillItem = {this.onSelectSkillItem}

                                        addValueInput = {() => this.addValueInput(item.uniqueId)}
                                        deleteValueInput = {this.deleteValueInput}
                                        changeValueInput = { this.changeValueInput }
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

export default FormComponent;