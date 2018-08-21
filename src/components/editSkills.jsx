import React, {Component} from 'react';

class EditSkills extends Component {

    render() {
        return (
            <div idx={this.props.key}>
                <select className="select-skill" name={this.props.name} id={this.props.id}
                        onChange={this.test}>
                    <option value="hp" onClick={this.handlePrint}>HP</option>
                    <option value="speed" onClick={this.handlePrint}>SPEED</option>
                    <option value="dmg" onClick={this.handlePrint}>COOLDOWN</option>
                    <option value="distance" onClick={this.handlePrint}>MELLEEDPS</option>
                </select>
                {
                    this.props.edit
                }
                <div className="btn-add-value">
                    <button onClick={this.props.addSkillValue}>+1</button>
                </div>
                <hr/>
            </div>

        )
    }
}

export default EditSkills;

