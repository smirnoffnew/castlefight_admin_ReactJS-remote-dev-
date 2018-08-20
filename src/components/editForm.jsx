import React, { Component } from 'react';

class EditFormComponent extends Component {

    state = {
        editSkills: [{name:""}],
        editSkillsValue: [{count: ''}],
        editSkillSelection: ""
    };
    addSkill = (e) => {
        this.setState((prevState) => ({
            editSkills: [...prevState.editSkills, {name:""}],
        }));
    };
    addSkillValue = (e) => {
        this.setState((prevState) => ({
            editSkillsValue: [...prevState.editSkillsValue, {count:""}],
        }));
    };
    handleSubmit = (e) => {
        e.preventDefault()
    };
    render() {
        let { editSkills } = this.state;
        let { editSkillsValue } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Hero Skills</h5>
                            {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close">*/}
                            {/*<span aria-hidden="true">&times;</span>*/}
                            {/*</button>*/}
                        </div>
                        <div className="modal-body">
                            {/*<label htmlFor="skill">Skill</label>*/}
                            <select name="skillSelection" id="skillSelection">
                                <option value="dmg">DMG</option>
                                <option value="hp">HP</option>
                                <option value="distance">DISTANCE</option>
                                <option value="speed">SPEED</option>
                            </select>
                            <label htmlFor="description"> #1</label>
                            <input type="text" name="damage" id="damage" />
                            <button onClick={this.addSkill}>+</button>
                            {
                                editSkills.map((val, idx)=> {
                                    let editSkillId = `edit-skill-${idx}`
                                    // let skillId = `skill-${idx}`, ageId = `age-${idx}`
                                    return (
                                        <div key={idx}>
                                            <select name={editSkillId} id={editSkillId}>
                                                <option value="dmg">DMG</option>
                                                <option value="hp">HP</option>
                                                <option value="distance">DISTANCE</option>
                                                <option value="speed">SPEED</option>
                                            </select>
                                            <label htmlFor={editSkillId}>{` #${idx + 1}`}</label>
                                            <input
                                                type="text"
                                                name={editSkillId}
                                                data-id={idx}
                                                id={editSkillId}
                                                className="name"
                                            />
                                            <button onClick={this.addSkillValue}>+1</button>
                                            {
                                                editSkillsValue.map((value, index) => {
                                                    let editSkillValueId = `editSkillValueId-${index}`;
                                                    return (
                                                        <div key={index}>
                                                            <label htmlFor={editSkillValueId}>{` #${index + 1}`}</label>
                                                            <input
                                                                type="text"
                                                                name={editSkillValueId}
                                                                data-id={index}
                                                                id={editSkillValueId}
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
                            <button type="button" className="btn btn-close" data-dismiss="modal" onClick={this.props.closeEditModal}>Close</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditFormComponent.propTypes = {};

export default EditFormComponent;