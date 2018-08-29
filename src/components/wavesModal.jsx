import React, { Component } from 'react';
import Helper from "../helper";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
    }
};

class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.helper = new Helper();

        let temp, values = [];
        if (props.emptyWaves) {
            temp = this.helper.waves()
            for (let item in temp) {
                let val = temp[item]
                if (typeof val === 'object') {
                    let outputObj = []
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

    getInputs() {
        if (this.state.values)
            return this.state.values.map((column, index) => {
                if (typeof column.value === 'object') {
                    return (
                        <td key={index}>
                            {
                                column.value.map((item, id) => (
                                    <div key={id}>
                                        <label >{item.name}</label>
                                        <input onChange={(e) => this.handleChange(e, index, id, 'value')} type="text" value={item.value} />
                                    </div>
                                ))
                            }
                        </td>
                    )

                } else {
                    return (
                        <td key={index}>
                            {column.name}: <input onChange={(e) => this.handleChange(e, index)} type="text" value={column.value} />
                        </td>
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
                            
                            <h5 className="modal-title">Add New Wave</h5>
                        </div>
                        <div className="modal-body">
                            <table>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        {this.getInputs()}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-save"
                                type="reset"
                                onClick={() => {
                                    this.props.closeModal()
                                    this.props.onSave(this.state.values)
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

export default ModalForm;