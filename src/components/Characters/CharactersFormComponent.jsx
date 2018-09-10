import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {SimpleSelect} from 'react-selectize';
import Helper from "../../helper";

class CharactersFormComponent extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
    }

    onSelectChange = value => {
        if (value) {
            this.props.onSelectComponentCallBack(this.props.component.uniqueId, value.value);
        }
    };

    onFocus = () => {
        const element = ReactDOM.findDOMNode(this._selectEl);
        if (element.getBoundingClientRect().top > 600)
            element.classList.add('top-select');
    };


    render() {
        return (
            <div>
                <div className="remove-component">
                    <button type="reset" onClick={this.props.deleteComponentCallBack}>delete select</button>
                </div>

                <div className="select-container">
                    <SimpleSelect
                        onFocus={this.onFocus}
                        ref={ node => {
                            this._selectEl = node
                        }}
                        value={({
                            value: this.props.component.type,
                            label: this.props.component.type.split('.')[this.props.component.type.split('.').length - 1]
                        })}
                        onValueChange={value => this.onSelectChange(value)}
                        options={this.props.defaultComponentsList.map(item => ({
                            label: item.type.split('.')[item.type.split('.').length - 1],
                            value: item.type
                        }))}>
                    </SimpleSelect>
                </div>

                <div>
                    <div className="new-inputs-container">
                        <label htmlFor="defaultValue">Default Value </label>
                        <input
                            type="text"
                            id="defaultValue"
                            value={this.props.component.defaultValue}
                            onChange={e => this.props.changeDefaultValueCallBack(
                                this.props.component.uniqueId,
                                e.target.value
                            )}
                        />
                    </div>
                    {
                        this.props.component.values.map((item, key) => (
                            <div key={key} className="new-inputs-container">
                                <input
                                    type="text"
                                    value={item.nameInput}
                                    onChange={e => this.props.changeValueInputCallBack(
                                        this.props.component.uniqueId,
                                        item.uniqueId,
                                        e.target.value,
                                        'name'
                                    )}
                                />
                                <input
                                    type="text"
                                    value={item.valueInput}
                                    onChange={(e) => this.props.changeValueInputCallBack(
                                        this.props.component.uniqueId,
                                        item.uniqueId,
                                        e.target.value,
                                        'value'
                                    )}
                                />
                                <button
                                    type="reset"
                                    onClick={
                                        () => this.props.deleteValueInputCallBack(this.props.component.uniqueId, item.uniqueId)}>
                                    delete prop
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div className="add-new-input-btn-container">
                    <button type="reset"
                            onClick={() => this.props.addValueInputCallBack(this.props.component.uniqueId)}>
                        +1
                    </button>
                </div>
                <hr />
            </div>

        )
    }
}

export default CharactersFormComponent;