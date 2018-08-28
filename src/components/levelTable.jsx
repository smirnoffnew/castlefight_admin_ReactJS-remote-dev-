import React, { Component } from 'react';
import Helper from "../helper";
import deleteIcon from "../assets/images/de.png";

const helper = new Helper;

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.data,
            disabled: true,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, id) {
        const target = e.target;
        this.setState((prevState) => {
            prevState.content[id][target.name] = target.value
            return {
                content: prevState.content
            }
        })
    }

    toggle() {
        if (!this.state.disabled) {
            let output = {}
            this.state.content.map((item)=>{
                output[item.name] = item.value
            })
            console.log('save', output)
        }
        this.setState((prevState) => ({
            disabled: !prevState.disabled
        }))
    }

    render() {
        return (
            <React.Fragment>
                <div className="table-btn">
                    <button onClick={() => this.toggle()}>
                        {this.state.disabled ? 'Edit' : 'Save'}
                    </button>
                    <button onClick={() => this.props.removeRecord(this.props.data.id)}>
                        <img src={deleteIcon} alt="Delete" className="delete-btn-icon" />
                    </button>
                </div>
                <table className="table table-bordered table-hover" width="100%">
                    <tbody>
                        {
                            this.state.content.map((rowContentItem, index) => {
                                let id = helper.makeId()
                                return (
                                    <tr key={id}>
                                        <td>
                                            <label htmlFor={id + 'name'}>Name</label>
                                            {': '}
                                            <input
                                                id={id + 'name'}
                                                type="text"
                                                name="name"
                                                value={rowContentItem.name}
                                                onChange={(e) => this.handleChange(e, index)}
                                                disabled={this.state.disabled}
                                            />
                                        </td>
                                        <td>
                                            <label htmlFor={id + 'value'}>Value</label>
                                            {': '}
                                            <input
                                                id={id + 'value'}
                                                type="text"
                                                name="value"
                                                value={rowContentItem.value}
                                                onChange={(e) => this.handleChange(e, index)}
                                                disabled={this.state.disabled}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

class Wrapper extends Component {
    render() {
        return (
            <div className="table-container">
                <h1>{this.props.content.entity}</h1>
                {
                    this.props.content.map((tabel, index) => (
                        <TableComponent
                            data={tabel}
                            key={index}
                            removeRecord={this.props.removeRecord}
                        />
                    ))
                }
            </div>
        )
    }
}

export default Wrapper;