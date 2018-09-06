import React, { Component } from 'react';
import EditButton from "./EditButton";
import deleteIcon from "../../assets/images/de.png";

class CharactersTable extends Component {
	render() {
		return (
			<div className="table-container">
				<table className="table table-bordered table-hover" width="100%">
					<thead>
						<tr>
							{
								this.props.withId ?
									<th>id</th>
									:
									null
							}
							{this.props.columns.map((column, key) => (this.props.location !== '/abilities' || column !== 'Name' ?
								<th key={key}>{column}</th>
								:
								null
							))}
						</tr>
					</thead>
					<tbody>
						{
							this.props.rows.map((row, key) => (
								<tr key={key}>
									{
										this.props.withId ?
											<td>{row.id}</td>
											:
											null
									}
									{
										this.props.location !== '/abilities' ?
											<td>{row.name}</td>
											:
											null
									}
									<td>
										{
											row.components.map((component, key) =>
												<div key={key}>
													<div>
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