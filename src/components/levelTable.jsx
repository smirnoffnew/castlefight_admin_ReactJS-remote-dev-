import React, { Component } from 'react';
import Helper from "../helper";
import deleteIcon from "../assets/images/de.png";
import ModalForm from "./levelsModal";

class TableRow extends Component {
    constructor(props) {
        super(props)
        this.helper = new Helper();
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
        this.props.onEdit(content)
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
            if (typeof column.value === 'object') {
                return (
                    <td key={index}>
                        {
                            column.value.map((item, id) => (
                                <div key={id}>
                                    {item.name + ': ' + item.value}
                                </div>
                            ))
                        }
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

        console.log('content', this.state.content)

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
    constructor(props) {
        super(props)
        this.helper = new Helper();
    }

    render() {

        console.log('this.props.content1234', this.props.content)

        return (
            <div className="table-container">
                <h1>{this.props.content.entity}</h1>
                {
                    this.props.content[0] ?
                        <table className="table table-bordered table-hover" width="100%">
                            <thead>
                                <tr>
                                    {this.props.content[0].map((column) => (<th key={this.helper.makeId()}>{column.name}</th>))}
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
                                            onEdit={this.props.onEdit}
                                            removeRecord={this.props.removeRecord}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        null
                }
            </div>
        )
    }
}

export default TableComponent;