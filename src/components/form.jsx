import React, {Component} from 'react';
import Skills from "./skills";

class FormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropDown: {
                "components": [
                    {
                        "type": "com.anygames.castlefight.components.Hp",
                        "defaultValue": null,
                        "values": {
                            "1": 20.0,
                            "2": 30.0,
                            "3": 40.0
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Speed",
                        "defaultValue": null,
                        "values": {
                            "1": 60.0,
                            "2": 70.0,
                            "3": 10.0
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Cooldown",
                        "defaultValue": null,
                        "values": {
                            "1": 60.0,
                            "2": 70.0,
                            "3": 10.0
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.MeleeDps",
                        "defaultValue": null,
                        "values": {
                            "1": 60.0,
                            "2": 70.0,
                            "3": 10.0
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Prefab",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Cost",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.NumberPercentage",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.MeleeAttackRadius",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.SummonCost",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.ProjectileSpeed",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.RangeDps",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.MaxGoldReward",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Aps",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.RestoreHpPerSec",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Name",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.UpgradeCost",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.PumpkinRewardChancePercentage",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.ThresholdCompanyLevel",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Distance",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.MinGoldReward",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.MapComponent",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.RangeAttackRadius",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.MaxOE",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.MaxPumpkinReward",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.MinPumpkinReward",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.Time",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }, {
                        "type": "com.anygames.castlefight.components.GoldRewardChancePercentag",
                        "defaultValue": null,
                        "values": {
                            "1": 50.0,
                            "2": 60.0,
                            "3": 70
                        }
                    }
                ]
            },
            skills: [{name: ""}],
            skillsValue: 1,
            skillSelection: "",
            options: [
                {value: 'hp', label: 'HP'},
                {value: 'speed', label: 'SPEED'},
                {value: 'cooldown', label: 'COOLDOWN'},
                {value: 'meleedps', label: 'MELEEDPS'}
            ],
            value: ''
        }
    }

    addSkill = (e) => {
        this.setState((prevState) => ({
            skills: [...prevState.skills, {name: ""}],
        }));
    };
    addSkillValue = (e) => {
        this.setState((prevState) => {
            console.log('new count', prevState.skillsValue)
            ;
            return {
                skillsValue: prevState.skillsValue + 1,
            }
        });
    };
    handleSubmit = (e) => {
        e.preventDefault()
    };

    handlePrint = () => {
        if (this.state.value) {
            console.log(this.state.value);
        }
        // this.state.value ? console.log(this.state.value) : ''
        this.state.value === 'speed' ? alert('cooool') : alert('error')
    }
    test = (e) => {
        this.setState({
            value: e.target.value,
        })

    }

    render() {
        let {skills} = this.state;
        // let {skillsValue} = this.state;
        let etq = [];

        for (let i = 0; i < this.state.skillsValue; i++) {
            let skillValueId = 'skillValueId-' + i;
            etq.push(
                <div className="new-inputs" key={i}>
                    <label htmlFor={skillValueId}>{` #${i + 1}`}</label>
                    <input
                        type="text"
                        name={skillValueId}
                        data-id={i}
                        id={skillValueId}
                        className="name"
                        value={this.state.dropDown.components[0].values["1"]}
                    />
                </div>
            )
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adding hero skills</h5>
                        </div>
                        <div className="modal-body">
                            <button onClick={this.addSkill}>Add</button>
                            <hr/>
                            {
                                skills.map((val, idx) => {
                                    let skillId = `skill-${idx}`;
                                    // let skillId = `skill-${idx}`, ageId = `age-${idx}`
                                    return (
                                        <Skills
                                            key={idx}
                                            name={skillId}
                                            id={skillId}
                                            addSkillValue={this.addSkillValue}
                                            etq={etq}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-save">Save</button>
                            <button type="button" className="btn btn-close" data-dismiss="modal"
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