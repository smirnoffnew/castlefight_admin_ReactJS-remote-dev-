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
            values: props.values,
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: parseInt(e.target.value) })
    }

    getInputs() {
        if (this.state.values) {
            return this.state.values.map((column, index) => {
                console.log('this.state.values', column.name);
                let output = [], i = 0;
                if (typeof column.value === 'object') {
                    for (let item in column.value) {
                        output.push(
                            <React.Fragment key={i}>
                                <input onChange={()=>{}} type="text" value={item} />
                                <input onChange={()=>{}} type="text" value={column.value[item]} />
                            </React.Fragment>
                        )
                        i++
                    }
                    return (
                        <td key={index}>
                            {output}
                        </td>
                    )
                } else {
                    return (
                        <td key={index}>
                            {column.name}: <input onChange={()=>{}} type="text" value={column.value} />
                        </td>
                    )
                }
            })
        }
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