import React, {Component, PureComponent} from 'react';

const defaults = {
    hp: 21,
    speed: 22,
    dmg: 23,
    distance: 24,
};

class SkillValue extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            value: props.initValue,
            parent: props.parent,
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.skillValueId = `skillValueId-${props.key}`;
    }
    changeHandler (e) {
        console.log(`INPUT ${this.skillValueId} OF ${this.state.parent} TYPE HAS BEEN CHANGED TO ${e.target.value}`);
        this.setState((prevState) => {
            value: e.target.value
        });
    }
    render () {
        return (
            <div className="new-inputs" key={this.props.key}>
                <label htmlFor={this.skillValueId}>{` #${this.props.key + 1}`}</label>
                <input
                    type="text"
                    name={this.skillValueId}
                    data-id={this.props.key}
                    id={this.skillValueId}
                    className="name"
                    value={this.state.value}
                    onChange={this.changeHandler}
                />
            </div>
        )
    }
}

class SkillValues extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            hp: props.hp || [],
            speed: props.speed || [],
            dmg: props.dmg || [],
            distance: props.distance || [],
            showNow: 'hp',
        };
    }
    changeInputs (e) {
        this.setState((prevState) => {
            showNow: e.target.value
        });
    }
    addSkillValue = (name) => {
        this.setState((prevState) => {
            [name]: [ ...prevState[name], {
                key: prevState[name].length,
                value: defaults[name],
                parent: name,
            } ]
        });
    }
    render () {
        let inputs = this.state[this.state.showNow].map((x, i, ar) => {
            return (
                <SkillValue key={x.key} initValue={x.value} parent={x.parent} />
            );
        });
        return (
            <div idx={this.props.key}>
                <select className="select-skill" name={this.props.name} id={this.props.id}
                        onChange={this.changeInputs}>
                    <option value="hp" onClick={this.handlePrint}>HP</option>
                    <option value="speed" onClick={this.handlePrint}>SPEED</option>
                    <option value="dmg" onClick={this.handlePrint}>COOLDOWN</option>
                    <option value="distance" onClick={this.handlePrint}>MELLEEDPS</option>
                </select>
                {
                    inputs
                }
                <div className="btn-add-value">
                    <button onClick={(e) => {
                        this.props.addSkillValue(this.state.showNow);
                    }}>+1</button>
                </div>
                <hr/>
            </div>

        )
    }
}

export default Skills;