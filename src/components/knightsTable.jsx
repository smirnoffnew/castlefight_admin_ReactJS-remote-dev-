import React, {Component} from 'react';
import deleteIcon from "../assets/images/de.png";
import EditButton from "./editButton";

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entity: 'knights',
            content: {
                data: [],
                columns: [],
            }
        };
    }

    handleRemoveRow = () => {
        console.log('pizda !!!!!!!!!!!!!!!! delete');
        this.setState((prevState) => {
            return {
                // rows: [...prevState.skills.filter(item => item.uniqueId !== id)]
            }
        });
    };

    makeKey() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    render() {
        return (
            <div className = "table-container">
                <h1>{this.props.content.entity}</h1>
                <table className="table table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            {this.props.content.columns.map(column => <th key={this.makeKey()}>{column}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.content.data.map((rowContentItem) =>
                            <tr key={this.makeKey()}>
                                <td>{rowContentItem.name}</td>
                                <td>
                                    {
                                        rowContentItem.components.map((componentItem) =>
                                            <div key={this.makeKey()}>{componentItem.type}</div>
                                        )

                                    }
                                </td>
                                <td className="center-btn-align">
                                    <EditButton/>
                                </td>
                                <td className="center-btn-align2">
                                    <button className="delete-btn" onClick={() => this.props.removeRecord(this.props.entity,rowContentItem.name)}>
                                        <img src={deleteIcon} alt="Delete" className="delete-btn-icon"/>
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