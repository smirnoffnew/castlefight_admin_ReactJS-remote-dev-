import React, { Component } from 'react';
import EditButton from "./editButton";
import Helper from "../helper";
import deleteIcon from "../assets/images/de.png";

class CharactersTable extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
    }

    render() {
        return (
            <div className="table-container">
                <table className="table table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            {this.props.columns.map(column => <th key={this.helper.makeId()}>{column}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.rows.map((row) => (
                                <tr key={this.helper.makeId()}>

                                    <td>{row.name}</td>

                                    <td>
                                        {
                                            row.components.map((component) =>
                                                <div key={this.helper.makeId()}>
                                                    <div key={this.helper.makeId()}>
                                                        {component.type.split('.')[component.type.split('.').length - 1]}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </td>

                                    <td className="center-btn-align">
                                        <EditButton
                                            entity={this.props.entity}
                                            record={row}
                                            abilities={this.props.abilities}
                                            getData={this.props.getData} />
                                    </td>

                                    <td className="center-btn-align2">
                                        <button className="delete-btn"
                                                onClick={
                                                    () => this.props.removeRecord(
                                                        this.props.entity,
                                                        this.props.entity === 'knights' ? row.name : row.id)
                                                }>
                                            <img src={deleteIcon} alt="Delete" className="delete-btn-icon" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CharactersTable;