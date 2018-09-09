import React, { Component } from 'react';
import EditButton from "./EditButton";
import deleteIcon from "../../assets/images/de.png";

class CharactersTable extends Component {

	sortById = () =>{
       return this.props.rows.sort((prev, next)=>{
           if (prev.id > next.id) {
               return 1;
           }
           if (prev.id < next.id) {
               return -1;
           }
           return 0;
	   })
	};

	render() {
		return (
			<div className="table-container">
				<table className="table table-bordered table-hover" width="100%">
					<thead>
						<tr>
							{
								this.props.characterType === 'knight'
								?
								null
								:
								<th>id</th>
                            }
							{
								this.props.columns.map((column, key) => (
									this.props.location === '/abilities' && column === 'Name'
									?
									null
									:
									<th key={key}>{column}</th>
								))
							}
						</tr>
					</thead>
					<tbody>
						{
							(this.props.characterType === 'knight' ? this.props.rows : this.sortById() ).map((row, key) => (
								<tr key={key}>
									{

                                        this.props.characterType === 'knight'
                                        ?
										null
										:
										<td>{row.id}</td>
									}
									{
                                        this.props.location === '/abilities'
										?
										null
										:
                                        <td>{row.name}</td>
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
                                            characterType={this.props.characterType}
											record={row}
                                            defaultComponentsList={this.props.defaultComponentsList}
                                            getDataCallBack={this.props.getDataCallBack}
											saveFormCallBack={this.props.saveFormCallBack}/>
									</td>
									<td className="center-btn-align2">
										<button className="delete-btn"
											onClick={() => this.props.removeRecordCallBack(
													this.props.characterType === 'knight' ? row.name : row.id)
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