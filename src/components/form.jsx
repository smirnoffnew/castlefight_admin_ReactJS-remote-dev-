import React, {Component} from 'react';

class FormComponent extends Component {

    state = {
        skills: [{name: ""}],
        skillsValue: 1,
        skillSelection: "",
        options: [
            {value: 'dmg', label: 'DMG'},
            {value: 'hp', label: 'HP'},
            {value: 'distance', label: 'DISTANCE'},
            {value: 'speed', label: 'SPEED'}
        ],
        value: ''
    };
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
                            {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close">*/}
                            {/*<span aria-hidden="true">&times;</span>*/}
                            {/*</button>*/}
                        </div>
                        <div className="modal-body">
                            {/*<label htmlFor="skill">Skill</label>*/}
                            {/*<select name="skillSelection" id="skillSelection">*/}
                            {/*<option value="dmg">DMG</option>*/}
                            {/*<option value="hp">HP</option>*/}
                            {/*<option value="distance">DISTANCE</option>*/}
                            {/*<option value="speed">SPEED</option>*/}
                            {/*</select>*/}
                            {/*<label htmlFor="description"> #1</label>*/}
                            {/*<input type="text" name="damage" id="damage" />*/}
                            <button onClick={this.addSkill}>Add</button>
                            <hr/>
                            {
                                skills.map((val, idx) => {
                                    let skillId = `skill-${idx}`;
                                    // let skillId = `skill-${idx}`, ageId = `age-${idx}`
                                    return (
                                        <div key={idx}>
                                            <select className="select-skill" name={skillId} id={skillId}
                                                    onChange={this.test}>
                                                <option value="dmg" onClick={this.handlePrint}>DMG</option>
                                                <option value="hp" onClick={this.handlePrint}>HP</option>
                                                <option value="distance" onClick={this.handlePrint}>DISTANCE</option>
                                                <option value="speed" onClick={this.handlePrint}>SPEED</option>
                                            </select>
                                            {
                                                etq
                                            }
                                            <div className="btn-add-value">
                                                <button onClick={this.addSkillValue}>+1</button>
                                            </div>
                                            <hr/>
                                        </div>
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