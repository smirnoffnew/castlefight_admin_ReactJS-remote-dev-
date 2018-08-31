import React, { Component } from 'react';
import Modal from "react-modal";
import Select from 'react-select';
import Helper from "../../helper";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        overflow: 'auto !important',
        transform: 'translate(-50%, -50%)',
    }
};

class LevelsModalForm extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();

        let temp, values = [];
        if (props.emptyLevel) {
            temp = this.helper.level();
            for (let item in temp) {
                let val = temp[item];
                if (typeof val === 'object') {
                    let outputObj = [];
                    for (let item in val) {
                        if (typeof val[item] === 'object') {
                            outputObj.push({ 'name': val[item].type, 'value': val[item].count })
                        } else {
                            outputObj.push({ 'name': item, 'value': val[item] })
                        }
                    }
                    val = outputObj
                }
                values.push({ 'name': item, 'value': val })
            }
        }

        this.state = {
            values: props.values ? props.values : values,
            isEdit: this.props.isEdit
        }
    }

    handleChange(e, index, id, type) {
        const value = e.target.value;
        this.setState((prevState) => {
            if (typeof id === 'number') {
                prevState.values[index].value[id][type] = value
            } else {
                prevState.values[index].value = value
            }
            return { prevState }
        })
    }

    onSelectChange = (value, name) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                values: prevState.values.map(item => {
                    return item.name === name ? {name:item.name, value:value.value} : item;
                }),
            }
        });
    };

    getInputs() {
        if (this.state.values)
            return this.state.values.map((column, index) => {
                if (typeof column.value === 'object' && column.name !== 'enemyWaveIds') {
                    return (
                        <tr key={index}>
                            <td>{column.name}</td>
                            <td>
                                {
                                    column.value.map((item, id) => (
                                        <label key={id}>{column.name === 'enemyWaveIds' ? null : (item.name + ': ')}</label>
                                    ))
                                }
                            </td>
                            <td>
                                {
                                    column.value.map((item, id) => (
                                        <React.Fragment key={id}>
                                            <input onChange={(e) => this.handleChange(e, index, id, 'value')} type="text" value={item.value}  />
                                            <br />
                                        </React.Fragment>
                                    ))
                                }
                            </td>
                        </tr>
                    )
                } else if (column.name === 'enemyWaveIds') {
                    return (
                        <tr key={index}>
                            <td>{column.name}</td>
                            <td colSpan="2">
                                {
                                    column.value.map((item, id) => (
                                        <React.Fragment key={id}>
                                            <input onChange={(e) => this.handleChange(e, index, id, 'value')} type="text" value={item.value} />
                                            <br />
                                        </React.Fragment>
                                    ))
                                }
                            </td>
                        </tr>
                    )
                }
                else {
                    return (
                        <tr key={index}>
                            <td>{column.name}</td>
                            <td colSpan="2">
                                {
                                    column.name === 'background' || column.name === 'companyAct'
                                    ?
                                    <Select
                                        value={({
                                            value:column.value,
                                            label:column.value})}
                                        onChange={(value)=>this.onSelectChange(value,column.name)}
                                        options={this.props[`${column.name}s`]}
                                    />
                                    :
                                    <input onChange={(e) => this.handleChange(e, index)} type="text" value={column.value} disabled={column.name === 'id' ? this.state.isEdit : false} />
                                }
                            </td>
                        </tr>
                    )
                }
            })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                ariaHideApp={false}
                style={customStyles}
            >
                <form >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Level</h5>
                        </div>
                        <div className="modal-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th colSpan="2">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getInputs()}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-save"
                                type="reset"
                                onClick={() => {
                                    this.props.closeModal();
                                    this.props.onSave(this.state.values);
                                }}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-close"
                                type="reset"
                                onClick={this.props.closeModal}
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default LevelsModalForm;
