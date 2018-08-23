import React, {Component} from 'react';
import deleteIcon from "../assets/images/de.png";
import EditButton from "./editButton";

class TableComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: {id: 0}

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
                // rows: [...prevState.skills.filter(item => item.uniqueId !== id)]
            }
        });
    };

    render() {
        const dataColumns = this.props.data.columns;
        const dataRows = this.props.data.rows;
        const tableHeaders = (
            <thead>
            <tr>
                {dataColumns.map((column, index) => {
                    return <th key={index}>{column}</th>;
                })}
            </tr>
            </thead>);

        const tableBody = dataRows.map((row, index) => {
            let tRowId = `tRowId-${index}`;
            return (
                <tr id={tRowId} key={index}>
                    {dataColumns.map((column, index) => {
                        const btnName = row[column];
                        return column === 'Edit'
                            ?
                            <td className="center-btn-align" key={index}>
                                <EditButton/>
                            </td>
                            :
                            <td key={index}>{btnName}</td>

                            &&

                            column === 'Delete'
                            ?
                            <td className="center-btn-align2" key={index}>
                                <button className="delete-btn" onClick={this.handleRemoveRow}>
                                    <img src={deleteIcon} alt="Delete" className="delete-btn-icon"/>
                                    {btnName}
                                </button>
                            </td>
                            :
                            <td key={index}>{btnName}</td>
                    })}
                </tr>);
        });
        return (
            <table className="table table-bordered table-hover" width="100%">
                {tableHeaders}
                <tbody>{tableBody}</tbody>
            </table>
        );
    }
}

export default TableComponent;