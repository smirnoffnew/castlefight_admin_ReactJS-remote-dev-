import React, { Component } from 'react';
import ButtonComponent from "./buttonComponent";
import Helper from "../helper";
import deleteIcon from "../assets/images/de.png";

const helper = new Helper;

class TableComponent extends Component {
    render() {
        return (
            <div className="table-container">
                <h1>{this.props.content.entity}</h1>
                <table className="table table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            {this.props.content.columns.map(column => <th key={helper.makeId()}>{column}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.content.data.map((rowContentItem) =>
                                <tr key={helper.makeId()}>
                                    <td>{rowContentItem.name}</td>
                                    <td>
                                        {
                                            rowContentItem.components.map((componentItem) =>
                                                <div key={helper.makeId()}>{componentItem.type}</div>
                                            )
                                        }
                                    </td>
                                    <td className="center-btn-align">
                                        <ButtonComponent
                                            data={rowContentItem}
                                            label='edit'
                                            getData={this.props.getData} />
                                    </td>
                                    <td className="center-btn-align2">
                                        <button className="delete-btn" onClick={() => this.props.removeRecord(this.props.entity, rowContentItem.name)}>
                                            <img src={deleteIcon} alt="Delete" className="delete-btn-icon" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableComponent;