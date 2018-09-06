import React, { Component } from 'react';
import AddButton from "../components/Characters/AddButton";
import Loading from "../components/common/loading";
import CharactersTable from "../components/Characters/CharactersTable";
import Helper from "../helper";
import axios from '../axiosBaseUrlConfig';
import { withAlert } from "react-alert"


class TableContainer extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
		this.state = {
			isLoaded: false,
			entity: '',
			abilities: [],
			rows: [],
			columns: ['Name', 'Components', 'Edit', 'Delete']
		};
		console.log('porps', props)
	}

	componentDidMount() {
		this.getData();
	};

	componentWillReceiveProps() {
		this.getData();
	};

	objectToArray = (objectData) => {
		return objectData
			?
			Object.keys(objectData).map(key => ({
				uniqueId: this.helper.makeId(),
				nameInput: key,
				valueInput: objectData[key]
			}))
			:
			[]
	};

	removeRecord = (entity, id) => {
		axios
			.delete(`/${entity}/${id}`, {})
			.then(() => {
				this.props.alert.success(`${this.helper.getEntityNameByUrl(entity)} Successfully deleted!`);
				this.getData()
			})
			.catch((error) => {
				console.error(error);
			});
	};

	getData = () => {
		axios
			.get(this.props.history.location.pathname)
			.then(response => {
				this.setState((prevState) => ({
					...prevState,
					entity: this.props.history.location.pathname.substr(1),
					rows: response.data.map(entityItem => (
						{
							...entityItem,
							components: entityItem.components.map(item => {
								return {
									...item,
									uniqueId: this.helper.makeId(),
									values: this.objectToArray(item.values)
								}
							}),
							uniqueId: this.helper.makeId(),
							name: this.props.history.location.pathname === '/abilities' ? entityItem.id : entityItem.name,
						}
					)),
				}));
				return this.getComponentsList();
			})
			.then((componentsListResponse) => {
				this.setState((prevState) => ({
					...prevState,
					isLoaded: true,
					abilities: componentsListResponse.data.map(componentName => this.helper.getUniqueAbility(componentName))
				}));
			})
			.catch(error => {
				console.error(error);
			});
	};

	getComponentsList = () => axios.get('/components');

	render() {
		return (
			<div className="container">
				<h2 className="col-50">{this.state.entity}</h2>
				{
					this.state.isLoaded
						?
						<div>
							<AddButton
								abilities={this.state.abilities}
								entity={this.state.entity}
								getData={this.getData}
							/>
							<CharactersTable
								location={this.props.location.pathname}
								abilities={this.state.abilities}
								entity={this.state.entity}
								columns={this.state.columns}
								rows={this.state.rows}
								getData={this.getData}
								removeRecord={this.removeRecord}
								withId={this.props.location.pathname !== '/knights'}
							/>
						</div>
						:
						<Loading />
				}
			</div>
		)
	};
}

export default withAlert(TableContainer);
