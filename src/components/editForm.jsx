import React, {Component} from 'react';
import EditSkills from "./editSkills";

class EditFormComponent extends Component {

    state = {
        editSkills: [{name: ""}],
        editSkillsValue: 1,
        editSkillSelection: ""
    };
    addSkill = (e) => {
        this.setState((prevState) => ({
            editSkills: [...prevState.editSkills, {name: ""}],
        }));
    };
    addSkillValue = (e) => {
        this.setState((prevState) => {
            return {
                editSkillsValue: prevState.editSkillsValue + 1,
            }
        });
    };
    handleSubmit = (e) => {
        e.preventDefault()
    };

    render() {
        let {editSkills} = this.state;
        // let { editSkillsValue } = this.state;
        let edit = [];

        for (let i = 0; i < this.state.editSkillsValue; i++) {
            let editSkillValueId = 'editSkillValueId-' + i;
            edit.push(
                <div className="new-inputs" key={i}>
                    <label htmlFor={editSkillValueId}>{` #${i + 1}`}</label>
                    <input
                        type="text"
                        name={editSkillValueId}
                        data-id={i}
                        id={editSkillValueId}
                        className="name"
                    />
                </div>
            )
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Hero Skills</h5>
                        </div>
                        <div className="modal-body">
                            <button onClick={this.addSkill}>Add</button>
                            <hr/>
                            {
                                editSkills.map((val, idx) => {
                                    let editSkillId = `edit-skill-${idx}`
                                    // let skillId = `skill-${idx}`, ageId = `age-${idx}`
                                    return (
                                        <EditSkills
                                            key={idx}
                                            name={editSkillId}
                                            id={editSkillId}
                                            addSkillValue={this.addSkillValue}
                                            edit={edit}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-save">Save</button>
                            <button type="button" className="btn btn-close" data-dismiss="modal"
                                    onClick={this.props.closeEditModal}>Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditFormComponent.propTypes = {};

export default EditFormComponent;