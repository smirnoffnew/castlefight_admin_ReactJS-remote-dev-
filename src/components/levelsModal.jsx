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
        this.state = {
            count: 1,
            summon: 10,
            create: 10,
            delay: 1,
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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
                            <h5 className="modal-title">Add New Cycle</h5>
                        </div>
                        <div className="modal-body">
                            <table>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="count">count</label>
                                        </td>
                                        <td>
                                            <input
                                                id="count"
                                                name="count"
                                                type="text"
                                                onChange={(e) => this.handleChange(e)}
                                                value={this.state.count}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="summon">summonEnemyTimeS</label>
                                        </td>
                                        <td>
                                            <input
                                                id="summon"
                                                name="summon"
                                                type="count"
                                                onChange={(e) => this.handleChange(e)}
                                                value={this.state.summon}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="create">createNewCycleTimeS</label>
                                        </td>
                                        <td>
                                            <input
                                                id="create"
                                                name="create"
                                                type="count"
                                                onChange={(e) => this.handleChange(e)}
                                                value={this.state.create}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="delay">delayBeforeStartS</label>
                                        </td>
                                        <td>
                                            <input
                                                id="delay"
                                                name="delay"
                                                type="count"
                                                onChange={(e) => this.handleChange(e)}
                                                value={this.state.delay}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-save"
                                type="reset"
                                onClick={() => this.props.addCycle({
                                    summonEnemyTimeS: this.state.summon,
                                    createNewCycleTimeS: this.state.create,
                                    delayBeforeStartS: this.state.delay,
                                    count: this.state.count,
                                })}
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