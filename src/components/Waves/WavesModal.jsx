import React, { Component } from 'react';
import Modal from "react-modal";
import Select from 'react-select';
import Helper from "../../helper";

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		overflow: 'auto',
	}
};

class ModalForm extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();

		this.state = {
			values: props.values ? props.values : {},
			isEdit: this.props.isEdit
		}
	};

	componentWillReceiveProps() {
		if (this.props.data && this.props.emptyWaves) {
			let temp, values = [];
			temp = this.helper.waves(this.props.data);
			for (let item in temp) {
				let val = temp[item];
				if (typeof val === 'object') {
					let outputObj = [];
					for (let item in val) {
						if (typeof val[item] === 'object') {
							outputObj.push({ 'name': val[item].type, 'value': val[item].count })
						} else {
							outputObj.push({ 'name': item, 'value': val[item] })
						}
					}
					val = outputObj
				}
				values.push({ 'name': item, 'value': val })
			}
			this.setState({ values })
		}
	}

	handleChange(e, index, id, type) {
		const value = e.target.value;
		this.setState((prevState) => {
			if (typeof id === 'number') {
				prevState.values[index].value[id][type] = value
			} else {
				prevState.values[index].value = value
			}
			return { prevState }
		})
	};

	handleChangeId(e, index, type, key) {
		const value = typeof e === 'string' || typeof e === 'number' ? e : e.target.value;
		if (type === 'id') {
			this.setState(prevState => {
				let values = Object.keys(prevState.values[index].value).filter(item => item !== key);
				let output = {};
				values.forEach(item => output[item] = prevState.values[index].value[item]);
				output[value] = prevState.values[index].value[key];
				prevState.values[index].value = output;
				return prevState;
			})
		} else {
			this.setState( prevState => {
				Object.keys(prevState.values[index].value).map( item => {
					if (item === key) {
						prevState.values[index].value[key][type] = value
					}
				});
				return prevState;
			})
		}

	}

	handleAddWave(e, index) {
		e.preventDefault();
		this.setState(prevState => {
			let biggest = 0;
			Object.keys(prevState.values[index].value).forEach(item => {
				if (parseInt(item, 10) && parseInt(item, 10) > biggest)
					biggest = parseInt(item, 10)
			});
			prevState.values[index].value[biggest + 1] = {
				type: 'Week',
				count: 10,
			};
			return prevState;
		})
	}

	handleDelete(e, index, key) {
		e.preventDefault();
		this.setState(prevState => {
			let values = Object.keys(prevState.values[index].value).filter(item => item !== key);
			let output = {};
			values.forEach(item => output[item] = prevState.values[index].value[item]);
			prevState.values[index].value = output;
			return prevState;
		})
	}

	getInputs() {
		if (Array.isArray(this.state.values) && this.state.values.length > 0) {
			return this.state.values.map((column, index) => {
				if (typeof column.value === 'object' && column.name !== 'enemyIdsAndCount') {
					return (
						<tr key={index}>
							<td>{column.name}</td>
							<td>
								{
									Object.keys(column.value).map((key, id) => (
										<label key={id}>{key === 'enemyWaveIds' ? null : (key + ': ')}</label>
									))
								}
							</td>
							<td>
								{
									Object.keys(column.value).map ((key, id) => {
										return <React.Fragment key={id}>
											<input onChange={(e) => this.handleChange(e, index, id, 'value')}
												   type="text"
												   value={column.value[key]} />
											<br />
										</React.Fragment>
									})


								}
							</td>
						</tr>
					)
				} else if (column.name === 'enemyIdsAndCount') {
					return (
						<tr key={index}>
							<td>{column.name}</td>
							<td colSpan="2">
								<div className="AddWave-button">
									<button onClick={(e) => this.handleAddWave(e, index)}>
										add new
									</button>
								</div>
								{
									Object.keys(column.value).map((key, id) => (
										<div key={id} className="three-inputs">
											<Select
												className="select-3"
												value={({
													value: key,
													label: key
												})}
												onChange={(e) => this.handleChangeId(e.value, index, 'id', key)}
												options={this.props.enemies}
											/>
											<Select
												className="select-3"
												value={({
													value: column.value[key].type,
													label: column.value[key].type
												})}
												onChange={(e) => this.handleChangeId(e.value, index, 'type', key)}
												options={[
													{
														value: 'Week',
														label: 'Week'
													},
													{
														value: 'Normal',
														label: 'Normal'
													},
													{
														value: 'Hard',
														label: 'Hard'
													},
													{
														value: 'Boss',
														label: 'Boss'
													},
												]}
											/>
											<input onChange={(e) => this.handleChangeId(e, index, 'count', key)} type="text" value={column.value[key].count} />
											<button onClick={(e) => this.handleDelete(e, index, key)}>
												x
											</button>
										</div>
									))
								}
							</td>
						</tr>
					)
				}
				else {
					return (
						<tr key={index}>
							<td>{column.name}</td>
							<td colSpan="2"><input onChange={(e) => this.handleChange(e, index)} type="text" value={column.value} disabled={column.name === 'id' ? this.state.isEdit : false} /></td>
						</tr>
					)
				}
			})
		}
	};

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				ariaHideApp={false}
				style={customStyles}
			>
				<form >
					<div className="modal-content">
						<div className="modal-header">

							<h5 className="modal-title">Add New Wave</h5>
						</div>
						<div className="modal-body">
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th colSpan="2">Value</th>
									</tr>
								</thead>
								<tbody>
									{this.getInputs()}
								</tbody>
							</table>
						</div>
						<div className="modal-footer">
							<button
								className="btn btn-save"
								type="reset"
								onClick={() => {
									this.props.closeModal()
									this.props.onSave(this.state.values)
								}}
							>
								Save
                            </button>
							<button
								className="btn btn-close"
								type="reset"
								onClick={this.props.closeModal}
								data-dismiss="modal"
							>
								Close
                            </button>
						</div>
					</div>
				</form>
			</Modal>
		)
	}
}

export default ModalForm;
