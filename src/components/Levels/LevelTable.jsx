import React, { Component } from 'react';
import LevelsModalForm from "./LevelsModalForm";
import Helper from "../../helper";
import deleteIcon from "../../assets/images/de.png";
import editIcon from "../../assets/images/edit-icon.png";
import FilterComponent from "./filter";

class TableRow extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
		this.state = {
			modalIsOpen: false,
		};
	}

	handleChange = (e, id) => {
		const target = e.target;
		this.setState((prevState) => {
			prevState.content[id].value = target.value;
			return {
				content: prevState.content
			}
		})
	};

	onSave = (content) => {
		this.props.onSave(content);
		this.setState({ content });
		this.closeModal();
	};

	openModal() {
		this.setState({ modalIsOpen: true });
	};

	closeModal() {
		this.setState({ modalIsOpen: false });
	};

	getColumns() {
		return this.props.data.map((column, index) => {
			if (typeof column.value === 'object') {
				return (
					<td key={index}>
						{
							column.value.map((item, id) => (
								<div key={id}>
									{column.name === 'enemyWaveIds' ? null : item.name + ': '}{item.value}
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
	};

	render() {
		return (
			<tr>
				{this.getColumns()}
				<td className="center-btn-align">
					<button className="edit-btn" onClick={() => this.openModal()}>
						<img src={editIcon} alt="Edit" className="edit-btn-icon" />
					</button>
					<LevelsModalForm
						values={this.props.data}
						enemyWaveIds={this.props.enemyWaveIds}
						backgrounds={this.props.backgrounds}
						companyActs={this.props.companyActs}
						isOpen={this.state.modalIsOpen}
						onSave={this.onSave}
						closeModal={() => this.closeModal()}
						isEdit={true}
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
		this.state = {
            backgrounds: this.props.backgrounds ? this.props.backgrounds : [],
            companyActs: this.props.companyActs ? this.props.companyActs : [],
            content: this.props.content ? this.props.content : [],
            enemyWaveIds: this.props.enemyWaveIds ? this.props.enemyWaveIds : [],
		};
	}

    applyFilters = (result) => {
        this.setState(prevState => {
            return {
                ...prevState,
                content: result
            }
        })
    };

    componentWillReceiveProps(nextProps) {
		this.setState( () => {
			return {
				...nextProps,
			}
		})
    }

	render() {
		return (
			<div className="table-container">

				<FilterComponent
					backgroundsList={this.props.backgrounds}
					companyActsList={this.props.companyActs}
					content={this.props.content}
					resultCallBack={this.applyFilters}
				/>

				{
					this.state.content[0]
						?
						<table className="table table-bordered table-hover" width="100%">
							<thead>
								<tr>
									{this.state.content[0].map( column => (<th key={this.helper.makeId()}>{column.name}</th>))}
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
									this.state.content.map((row, index) => (
										<TableRow
											key={index}
											data={row}
											enemyWaveIds={this.state.enemyWaveIds}
											backgrounds={this.state.backgrounds}
											companyActs={this.state.companyActs}
											onSave={this.props.onSave}
											removeRecord={this.props.removeRecord}
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
