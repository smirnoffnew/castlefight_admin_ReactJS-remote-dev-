import React, {Component} from 'react';
import deleteIcon from "../assets/images/de.svg";
import EditButton from "./editButton";

class TableComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: { id: 0 }

        };

        // this.deleteHandler = this.deleteHandler.bind(this);
    }

    // deleteHandler(e) {
    //     console.log("delete button clicked");
    //     // e.preventDefault();
    // }

    handleRemoveRow = () => {
        console.log('delete');
        this.setState((prevState) => {
            return {
                // rows: prevState.rows[0].id.slice(0, -1),
            }
        });
    };

    render() {
        const dataColumns = this.props.data.columns;
        const dataRows = this.props.data.rows;
        const tableHeaders = (
            <thead>
            <tr>
                {dataColumns.map((column) => {
                    return <th>{column}</th>;
                })}
            </tr>
            </thead>);
        const tableBody = dataRows.map((row, index) => {
            let tRowId = `tRowId-${index}`;
            return (
                <tr id={tRowId}>
                    {dataColumns.map((column) => {
                        const btnName = row[column];
                        return column === 'Edit'
                            ?
                            <td className="center-btn-align">
                                <EditButton/>
                            </td>
                            :
                            <td>{btnName}</td>

                            &&

                            column === 'Delete'
                            ?
                            <td className="center-btn-align2">
                                <button className="delete-btn" onClick={this.handleRemoveRow}>
                                    <img src={deleteIcon} alt="Delete" className="delete-btn-icon"/>
                                    {btnName}
                                </button>
                            </td>
                            :
                            <td>{btnName}</td>
                    })}
                </tr>);
        });
        return (
            <table className="table table-bordered table-hover" width="100%">
                {tableHeaders}
                {tableBody}
            </table>
        );
    }
}

export default TableComponent;