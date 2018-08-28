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
        this.setState({
            content: [
                { name: 'count', value: content.count },
                { name: 'summonEnemyTimeS', value: content.summonEnemyTimeS },
                { name: 'createNewCycleTimeS', value: content.createNewCycleTimeS },
                { name: 'delayBeforeStartS', value: content.delayBeforeStartS },
            ]
        });
        this.closeModal();
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        let values = {};
        const tdOutput = this.state.content.map((row, index) => {
            values[row.name] = row.value;
            return (
                <td key={index}>
                    {row.value}
                </td>
            )
        })

        return (
            <tr>
                {tdOutput}
                <td>
                    <button onClick={() => this.openModal()}>
                        {this.state.disabled ? 'Edit' : 'Save'}
                    </button>
                    <button onClick={() => this.props.removeRecord(this.props.data.id)}>
                        <img src={deleteIcon} alt="Delete" className="delete-btn-icon" />
                    </button>
                    <ModalForm
                        isOpen={this.state.modalIsOpen}
                        onSave={this.onSave}
                        closeModal={() => this.closeModal()}
                        count={values.count}
                        summon={values.summonEnemyTimeS}
                        create={values.createNewCycleTimeS}
                        delay={values.delayBeforeStartS}
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
                            this.props.content.map((tabel, index) => (
                                <TableRow
                                    data={tabel}
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