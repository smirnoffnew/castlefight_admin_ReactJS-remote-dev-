import React, { Component } from 'react';
import Helper from "../helper";
import deleteIcon from "../assets/images/de.png";
import ModalForm from "./levelsModal";

const helper = new Helper;

class TableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.data,
            disabled: true,
            modalIsOpen: false,
        };
        this.handleChange = this.handleChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    handleChange(e, id) {
        const target = e.target;
        this.setState((prevState) => {
            prevState.content[id].value = target.value
            return {
                content: prevState.content
            }
        })
    }

    onSave(content) {
        this.setState({ content });
        this.closeModal();
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    getColumns() {
        return this.state.content.map((column, index) => {
            let output = [], i = 0
            if (typeof column.value === 'object') {
                for (let item in column.value) {
                    output.push(
                        <div key={i}>
                            {item + ': ' + column.value[item]}
                        </div>
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
                        {column.value}
                    </td>
                )
            }
        })
    }

    render() {
        return (
            <tr>
                {this.getColumns()}
                <td>
                    <button onClick={() => this.openModal()}>
                        {this.state.disabled ? 'Edit' : 'Save'}
                    </button>
                    <button onClick={() => this.props.removeRecord(this.state.content[0].value)}>
                        <img src={deleteIcon} alt="Delete" className="delete-btn-icon" />
                    </button>
                    <ModalForm
                        isOpen={this.state.modalIsOpen}
                        onSave={this.onSave}
                        closeModal={() => this.closeModal()}
                        values={this.state.content}
                    />
                </td>
            </tr>
        );
    }
}

class TableComponent extends Component {
    render() {
        return (
            <div className="table-container">
                <h1>{this.props.content.entity}</h1>
                <table className="table table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            {this.props.content[0].map(column => <th key={helper.makeId()}>{column.name}</th>)}
                            <td>
                                Actions
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.content.map((row, index) => (
                                <TableRow
                                    data={row}
                                    key={index}
                                    removeRecord={this.props.removeRecord}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableComponent;