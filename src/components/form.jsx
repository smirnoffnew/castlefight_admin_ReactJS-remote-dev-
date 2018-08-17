import React, { Component } from 'react';

class FormComponent extends Component {

    state = {
        skills: [{name:""}],
        skillsValue: [{count: ''}],
        skillSelection: ""
    };
    addSkill = (e) => {
        this.setState((prevState) => ({
            skills: [...prevState.skills, {name:""}],
        }));
    };
    addSkillValue = (e) => {
        this.setState((prevState) => ({
            skillsValue: [...prevState.skillsValue, {count:""}],
        }));
    };
    handleSubmit = (e) => {
        e.preventDefault()
    };
    render() {
        let { skills } = this.state;
        let { skillsValue } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adding hero skills</h5>
                            {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close">*/}
                                {/*<span aria-hidden="true">&times;</span>*/}
                            {/*</button>*/}
                        </div>
                        <div className="modal-body">
                            <label htmlFor="skill">Skill</label>
                            <select name="skillSelection" id="skillSelection">
                                <option value="dmg">DMG</option>
                                <option value="hp">HP</option>
                                <option value="distance">DISTANCE</option>
                                <option value="speed">SPEED</option>
                            </select>
                            <label htmlFor="description">#1</label>
                            <input type="text" name="damage" id="damage" />
                            <button onClick={this.addSkill}>+</button>
                            {
                                skills.map((val, idx)=> {
                                    let skillId = `skill-${idx}`
                                    // let skillId = `skill-${idx}`, ageId = `age-${idx}`
                                    return (
                                        <div key={idx}>
                                            <select name={skillId} id={skillId}>
                                                <option value="dmg">DMG</option>
                                                <option value="hp">HP</option>
                                                <option value="distance">DISTANCE</option>
                                                <option value="speed">SPEED</option>
                                            </select>
                                            <label htmlFor={skillId}>{` #${idx + 1}`}</label>
                                            <input
                                                type="text"
                                                name={skillId}
                                                data-id={idx}
                                                id={skillId}
                                                className="name"
                                            />
                                            <button onClick={this.addSkillValue}>+1</button>
                                            {
                                                skillsValue.map((value, index) => {
                                                    let skillValueId = `skillValueId-${index}`;
                                                    return (
                                                        <div key={index}>
                                                            <label htmlFor={skillValueId}>{` #${index + 1}`}</label>
                                                            <input
                                                            type="text"
                                                            name={skillValueId}
                                                            data-id={index}
                                                            id={skillValueId}
                                                            className="name"
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                            <hr/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-save">Save</button>
                            <button type="button" className="btn btn-close" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

FormComponent.propTypes = {};

export default FormComponent;