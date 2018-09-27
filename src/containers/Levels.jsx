import React, { Component } from 'react';
import Alert from 'react-s-alert';
import LevelTable from "../components/Levels/LevelTable";
import LevelsModalForm from "../components/Levels/LevelsModalForm";
import Loading from "../components/common/loading";
import axios from "../axiosBaseUrlConfig";
import Helper from "../helper";

class Levels extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
		this.state = {
            modalIsOpen: false,
			isLoaded: false,
            entity: 'level',
			data:[],
            waves: [],
            backgrounds: [],
			companyActs: [],
			maxId: this.helper.makeNumberId()
		};
	}

	getWaves = () => axios.get('/enemyWaves');

	getBackgrounds = () => axios.get('/levels/backgrounds/');

	getCompanyActs = () => axios.get('/levels/companyActs/');

	getLevels = () => axios.get('/levels');

	getData = () => {
		let _levels;
        let _waves;
		let _backgrounds;
		let _companyActs;
		this.getLevels()
			.then( levelsResponse => {
                _levels = levelsResponse.data;
				_levels = _levels.map((value) => {
					let output = [];
					for (let item in value) {
						let val = value[item];
						if (typeof val === 'object') {
							let outputObj = [];
							for (let item in val) {
								if (typeof val[item] === 'object') {
									outputObj.push({ 'name': val[item] ? val[item].type : 0, 'value': val[item] ? val[item].count : 0 })
								} else {
									outputObj.push({ 'name': item, 'value': val[item] })
								}
							}
							val = outputObj
						}
						output.push({ 'name': item, 'value': val })
					}
					return output;
				});
				return this.getWaves();
			})
			.then( wavesResponse => {
                _waves = wavesResponse.data;
				return this.getBackgrounds();
			})
			.then( backgroundsResponse => {
                _backgrounds = backgroundsResponse.data;
				return this.getCompanyActs();
			})
			.then( companyActsResponse => {
                _companyActs = companyActsResponse.data;
				this.setState((prevState) => {
					return {
						...prevState,
                        isLoaded: true,
                        entity: this.props.history.location.pathname.substr(1),
                        data: _levels.map(item=>this.changePosition(item)),
                        enemyWaveIds: _waves.map(wave => ({ label: wave.id, value: wave.id })),
                        backgrounds: _backgrounds.map(background => ({ label: background, value: background })),
						companyActs: _companyActs.map(ActsResponse => ({ label: ActsResponse, value: ActsResponse })),
                        maxId: this.getMaxId(_levels)
					}
				});
			})
			.catch(error => {
                Alert.error(
                    `Something went wrong ${error.response.data}`,
                    {timeout: 6000}
                );
				console.error(error);
			});
	};


    arrModifier = (arr, name) => {
        let _object = {};
        let _index = 0;

        arr.forEach( (item, index) => {
            if (item.name === name){
                _object = item;
                _index = index;
            }
        });

        arr.splice(_index, 1);
        arr.splice(1, 0, _object);

        return arr;
    };

    changePosition = (arr) => {
        arr = this.arrModifier(arr, 'enemyWaveIds');
        arr = this.arrModifier(arr, 'audioClipName');
        arr = this.arrModifier(arr, 'index');
        return arr;
    };

	removeRecord = (id) => {
        if ((typeof id !== void(0)) && (typeof id === 'number' || typeof id === 'string'))
			axios
				.delete(`/levels/${id}`, {})
				.then(() => {
                    Alert.success(
                        `${this.helper.getCharacterNameByUrl(this.props.history.location.pathname)} with id ${id} Successfully deleted!`
                    );
					this.getData();
				})
				.catch( error  => {
                    Alert.error(
                        `Something went wrong ${error.response.data}`,
                        {timeout: 6000}
                    );
					console.error(error);
				});
		else
			console.error('this entity can\'t be deleted due to lack of id')
	};

	addCycle = (content) => {
		let send = false;
		content.forEach((item) => {
			if (item.name === 'id') {
				send = true
			}
		});
		if (send) {
			let output = {};
			content.forEach((item) => {
				if (item.value) {
					if (typeof item.value === 'object' && item.name !== 'enemyWaveIds') {
						output[item.name] = {};
						item.value.forEach((item2, index2) => {
							if (item.name === 'enemyWaveIds') {
								output[item.name] = [item2.value]
							} else if (item.name === 'enemyIdsAndCount') {
								output[item.name][index2 + 1] = { 'type': item2.name, 'count': item2.value }
							} else {
								output[item.name][item2.name] = item2.value;
							}
						})
					} else {
						output[item.name] = item.value;
					}
				}
			});
            output.id = Number(output.id);
			axios
				.post(`/levels`, output)
				.then(() => {
                    Alert.success(
                    	`${this.helper.getCharacterNameByUrl(this.props.history.location.pathname)} with id ${output.id} Successfully saved!`
					);
					this.getData();
				})
				.catch( error => {
                    Alert.error(
                        `Something went wrong ${error.response.data}`,
						{timeout: 6000}
                    );
					console.error(error);
				});
		}
		else
			console.error('this entity can\'t be edit/save due to lack of id')
	};

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	componentDidMount() {
		this.getData();
	};

	componentWillReceiveProps() {
		this.getData();
	};

    getMaxId = (data) => {
        return Math.max.apply(null, data.map(item => {
            let id = '';
            item.every(item => {
                if (item.name === 'id') {
                    id = item.value;
                    return false
                } else {
                	return true;
				}
            });
            return id;
        }));
    };

	render() {
		return (
			<div className="container">
				<h2 className="col-50">{this.state.entity}</h2>
				<div className="col-50 withButton">
					<button onClick={this.openModal}>
						Add Button
                    </button>
				</div>
				{
					this.state.isLoaded
						?
						<LevelTable
							content={this.state.data}
							enemyWaveIds={this.state.enemyWaveIds}
							backgrounds={this.state.backgrounds}
							companyActs={this.state.companyActs}
							removeRecord={this.removeRecord}
							onSave={this.addCycle}
							getData={this.getData}
						/>
						:
						<Loading />
				}

                {
                    this.state.isLoaded
					?
					<LevelsModalForm
						isEdit={false}
						isOpen={this.state.modalIsOpen}
						enemyWaveIds={this.state.enemyWaveIds}
						backgrounds={this.state.backgrounds}
						companyActs={this.state.companyActs}
						onSave={this.addCycle}
						closeModal={this.closeModal}
						maxId={this.state.maxId}
					/>
					: null
                }

			</div>
		)
	}
}

export default Levels;
