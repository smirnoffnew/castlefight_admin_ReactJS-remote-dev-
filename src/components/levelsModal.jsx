import React, { Component } from 'react';
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

class ModalForm extends Component {
    constructor(props) {
        super(props)
        const empty = [
            {
                name: 'id',
                value: 1
            },
            {
                name: 'pauseInterval',
                value: ''
            },
            {
                name: 'enemyIdsAndCount',
                value: [
                    {
                        name: 'Weak',
                        value: ''
                    },
                ]
            },
            {
                name: 'weakSummonCycle',
                value: [
                    { name: 'count', value: '' },
                    { name: 'summonEnemyTimeS', value: '' },
                    { name: 'createNewCycleTimeS', value: '' },
                    { name: 'delayBeforeStartS', value: '' },
                ]
            },
            {
                name: 'normalSummonCycle',
                value: [
                    { name: 'count', value: '' },
                    { name: 'summonEnemyTimeS', value: '' },
                    { name: 'createNewCycleTimeS', value: '' },
                    { name: 'delayBeforeStartS', value: '' },
                ]
            },
            {
                name: 'hardSummonCycle',
                value: [
                    { name: 'count', value: '' },
                    { name: 'summonEnemyTimeS', value: '' },
                    { name: 'createNewCycleTimeS', value: '' },
                    { name: 'delayBeforeStartS', value: '' },
                ]
            },
            {
                name: 'bossSummonCycle',
                value: [
                    { name: 'count', value: '' },
                    { name: 'summonEnemyTimeS', value: '' },
                    { name: 'createNewCycleTimeS', value: '' },
                    { name: 'delayBeforeStartS', value: '' },
                ]
            }
        ]

        this.state = {
            values: props.empty ? empty : props.values,
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
        console.log('this.state.values', this.state.values);
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

        console.log('props', this.props.values)
        console.log('props', this.props.empty)

        return (
            <Modal
                isOpen={this.props.isOpen}
                ariaHideApp={false}
                style={customStyles}
            >
                <form >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Cycle</h5>
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
                                onClick={() => this.props.onSave(this.state.values)}
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