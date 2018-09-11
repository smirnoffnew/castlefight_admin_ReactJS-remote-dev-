import React, { Component } from 'react';
import Helper from "../../helper";
import deleteIcon from "../../assets/images/de.png";
import editIcon from "../../assets/images/edit-icon.png";
import WavesModalForm from "./WavesModalForm";

class TableRow extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
		this.state = {
			modalIsOpen: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSave = this.onSave.bind(this)
	}

	handleChange(e, id) {
		const target = e.target;
		this.setState((prevState) => {
			prevState.content[id].value = target.value;
			return {
				content: prevState.content
			}
		})
	}

	onSave(content) {
		this.props.onEdit(content);
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
		return this.props.data.map((column, index) => {
			if (column.name === 'enemyIdsAndCount') {
				return (
					<td key={index}>
						{
							Object.keys(column.value).map((key, id) => (
								<div key={id} className="three-inputs">
									{key + ' - ' + column.value[key].type + ' - ' + column.value[key].count}
								</div>
							))
						}
					</td>
				)
			} else if (typeof column.value === 'object') {
				return (
					<td key={index}>
						{
							Object.keys(column.value).map((key, id) => (
								<div key={id}>
									{key + ': ' + column.value[key]}
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
		return (
			<tr>
				{this.getColumns()}
				<td className="center-btn-align">
					<button className="edit-btn" onClick={() => this.openModal()}>
						<img src={editIcon} alt="Edit" className="edit-btn-icon" />
					</button>
					<WavesModalForm
						isOpen={this.state.modalIsOpen}
						onSave={this.onSave}
						closeModal={() => this.closeModal()}
						values={this.props.data}
						enemies={this.props.enemies}
						isEdit={true}
						enemyTypes={this.props.enemyTypes}
					/>
				</td>
				<td className="center-btn-align2">
					<button className="delete-btn" onClick={() => this.props.removeRecord(this.props.data[0].value)}>
						<img src={deleteIcon} alt="Delete" className="delete-btn-icon" />
					</button>
				</td>
			</tr>
		);
	}
}

class TableComponent extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
	}

	render() {
		return (
			<div className="table-container">
				<h1>{this.props.content.entity}</h1>
				{
					this.props.content[0] ?
						<table className="table table-bordered table-hover" width="100%">
							<thead>
								<tr>
									{this.props.content[0].map((column) => (<th key={this.helper.makeId()}>{column.name}</th>))}
									<th>
										Edit
                                    </th>
									<th>
										Delete
                                    </th>
								</tr>
							</thead>
							<tbody>
								{
									this.props.content.map((row, index) => (
										<TableRow
											data={row}
											key={index}
											onEdit={this.props.onEdit}
											enemies={this.props.enemies}
											removeRecord={this.props.removeRecord}
											enemyTypes={this.props.enemyTypes}
										/>
									))
								}
							</tbody>
						</table>
						:
						<h3>No records</h3>
				}
			</div>
		)
	}
}

export default TableComponent;
