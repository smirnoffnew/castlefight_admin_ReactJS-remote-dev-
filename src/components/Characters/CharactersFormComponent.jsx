import React, { Component } from 'react';
import Select from 'react-select';
import Helper from "../../helper";

class CharactersFormComponent extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
	}

	onSelectChange = value => this.props.onSelectComponent(this.props.data.uniqueId, value.value);

	render() {
		return (
			<div>
				<div className="remove-component">
					<button type="reset" onClick={this.props.deleteComponent} >delete select</button>
				</div>

				<div className="select-container">
					<Select
						value={({
							value: this.props.data.type,
							label: this.props.data.type.split('.')[this.props.data.type.split('.').length - 1]
						})}
						onChange={this.onSelectChange}
						options={this.props.abilities.map((item) => ({
							label: item.type.split('.')[item.type.split('.').length - 1],
							value: item.type
						}))}
					/>
				</div>

				<div>
					<div className="new-inputs-container">
						<label htmlFor="defaultValue">Default Value </label>
						<input
							type="text"
							id="defaultValue"
							value={this.props.data.defaultValue || 10}
							onChange={(e) => this.props.changeDefaultValue(this.props.data.uniqueId, e)}
						/>
					</div>
					{
						this.props.data.values.map((item, key) => (
							<div key={key} className="new-inputs-container">
								<input
									type="text"
									value={item.nameInput}
									onChange={(e) => this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'name')}
								/>
								<input
									type="text"
									value={item.valueInput}
									onChange={(e) => this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'value')}
								/>
								<button
									type="reset"
									onClick={() => this.props.deleteValueInput(this.props.data.uniqueId, item.uniqueId)}>
									delete prop
                                </button>
							</div>
						))
					}
				</div>

				<div className="add-new-input-btn-container">
					<button type="reset" onClick={() => this.props.addValueInput(this.props.data.uniqueId)}>+1</button>
				</div>
				<hr />
			</div>

		)
	}
}

export default CharactersFormComponent;