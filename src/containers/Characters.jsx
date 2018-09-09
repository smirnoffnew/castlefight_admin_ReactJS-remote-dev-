import React, { Component } from 'react';
import AddButton from "../components/Characters/AddButton";
import Loading from "../components/common/loading";
import CharactersTable from "../components/Characters/CharactersTable";
import Helper from "../helper";
import axios from '../axiosBaseUrlConfig';
import { withAlert } from "react-alert"


class CharactersContainer extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
		this.state = {
			isLoaded: false,
			characterType: '',
			defaultComponentsList: [],
			rows: [],
			columns: ['Name', 'Components', 'Edit', 'Delete']
		};
		this.charactersData = Object.create(null);
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

	removeRecord = (idOrName) => {
		const characterType = this.props.history.location.pathname;
		axios
			.delete(`${characterType}/${idOrName}`, {})
			.then(() => {
				this.props.alert.success(`
					${this.helper.getCharacterNameByUrl(characterType)} with idOrName = ${idOrName} 
					Successfully deleted!`
				);
				this.getData()
			})
			.catch((error) => {
				console.error(error);
			});
	};

    saveRecord = (record) => {
        axios
            .post(this.props.history.location.pathname, record)
            .then(() => {
                this.props
                    .alert
                    .success(`${this.helper.getCharacterNameByUrl(this.state.characterType)} Successfully saved!`);
                this.props.getData();
            })
    };

	getData = () => {
		axios
			.get(this.props.history.location.pathname)
			.then(response => {
                this.charactersData.characterType = this.helper.getCharacterNameByUrl(this.props.history.location.pathname);
				this.charactersData.rows = response.data.map( entityItem => (
					{
						...entityItem,
						uniqueId: this.helper.makeId(),
						components: entityItem.components.map(item => {
							return {
								...item,
								uniqueId: this.helper.makeId(),
								values: this.objectToArray(item.values)
							}
						}),
					}
				));
				return this.getComponentsList();
			})
			.then((componentsListResponse) => {
				this.setState( prevState  => ({
					...prevState,
					...this.charactersData,
					isLoaded: true,
					defaultComponentsList: componentsListResponse
						.data
						.map(componentName => this.helper.getNewUniqueComponent(componentName))
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
				<h2 className="col-50">{this.state.characterType}</h2>
				{
					this.state.isLoaded
						?
						<div>

							<AddButton
								characterType={this.state.characterType}
								newRecord={this.helper.getCharacterDefaultModel(this.state.characterType)}
                                defaultComponentsList={this.state.defaultComponentsList}
								getDataCallBack={this.getData}
								saveFormCallBack={this.saveRecord}
							/>
							<CharactersTable
								location={this.props.location.pathname}
                                characterType={this.state.characterType}
                                defaultComponentsList={this.state.defaultComponentsList}
								columns={this.state.columns}
								rows={this.state.rows}
                                getDataCallBack={this.getData}
								removeRecordCallBack={this.removeRecord}
								saveFormCallBack={this.saveRecord}
							/>
						</div>
						:
						<Loading />
				}
			</div>
		)
	};
}

export default withAlert(CharactersContainer);
