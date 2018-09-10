export default class Helper {
	waves(data) {
		let temp
		if (Array.isArray(data)) {
			temp = 1
			data.forEach(column => {
				column.forEach(item => {
					if (item.name === 'id' && parseInt(item.value, 10) && parseInt(item.value, 10) > temp)
						temp = item.value
				})
			})
		}
		return (
			{
				"id": temp ? temp + 1 : this.makeNumberId(),
				"pauseInterval": 10,
				"enemyIdsAndCount": {
					"1": {
						"type": "Weak",
						"count": 10
					},
					"2": {
						"type": "Normal",
						"count": 10
					},
					"3": {
						"type": "Hard",
						"count": 10
					},
				},
				"weakSummonCycle": {
					"count": 1,
					"summonEnemyTimeS": 5.0,
					"createNewCycleTimeS": 10.0,
					"delayBeforeStartS": 10.0
				},
				"normalSummonCycle": {
					"count": 1,
					"summonEnemyTimeS": 5.0,
					"createNewCycleTimeS": 10.0,
					"delayBeforeStartS": 10.0
				},
				"hardSummonCycle": {
					"count": 1,
					"summonEnemyTimeS": 5.0,
					"createNewCycleTimeS": 10.0,
					"delayBeforeStartS": 10.0
				},
				"bossSummonCycle": {
					"count": 1,
					"summonEnemyTimeS": 5.0,
					"createNewCycleTimeS": 10.0,
					"delayBeforeStartS": 10.0
				}
			}
		)
	}

	level() {
		return (
			{
				"id": this.makeId(),
				"companyAct": "FIRST",
				"background": "SUMMER",
				"index": 10,
				"castlePosition": {
					"x": -30,
					"y": -5
				},
				"knightRespawnPoint": {
					"x": -20,
					"y": -5
				},
				"allyRespawnPoint": {
					"x": -19,
					"y": -5
				},
				"enemyRespawnPoint": {
					"x": 26,
					"y": -5
				},
				"audioClipName": "adventure2_loop",
				"enemyWaveIds": []
			}
		)
	}

	makeId() {
		let text = '';
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (let i = 0; i < 20; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

    makeRandomName() {
        let text = '';
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

	makeNumberId() {
		let text = '';
		const possible = "0123456789";
		for (let i = 0; i < 9; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	getCharacterDefaultModel(characterType, id, components){
        switch (characterType) {
            case 'knight':
                return {
                    "name" : this.makeRandomName(),
                    "projectileSettings" : {
                        "name" : this.makeRandomName(),
                        "localPosition" : {
                            "x" : 0.0,
                            "y" : 0.0
                        },

                        "startDirection" : {
                            "x" : 0.0,
                            "y" : 0.0
                        },

                        "force" : 0.0
                    },
                    "components" : [this.getNewUniqueComponent(components[0].type)]
                };
            case 'ally':
                return  {
                    "id" : id ? id :this.makeNumberId(),
                    "name" : this.makeRandomName(),
                    "projectileSettings" : {
                        "name" : this.makeRandomName(),
                        "localPosition" : {
                            "x" : 0.0,
                            "y" : 0.0
                        },

                        "startDirection" : {
                            "x" : 0.0,
                            "y" : 0.0
                        },

                        "force" : 0.0
                    },
                    "components" : [this.getNewUniqueComponent(components[0].type)]
                };
            case 'enemy':
                return {
                    "id" : id ? id :this.makeNumberId(),
                    "name" : this.makeRandomName(),
                    "components" : [this.getNewUniqueComponent(components[0].type)]
                };
            case 'ability':
                return {
                    "id" : id ? id :this.makeNumberId(),
                    "components" : [this.getNewUniqueComponent(components[0].type)]
				};
            default:
                return {};
        }
	}

	getNewUniqueComponent(type) {
		return {
			uniqueId: this.makeId(),
			type: type,
			defaultValue: null,
			values: [
				{
					uniqueId: this.makeId(),
					nameInput: 1,
					valueInput: 10
				},
				{
					uniqueId: this.makeId(),
					nameInput: 2,
					valueInput: 20
				},
				{
					uniqueId: this.makeId(),
					nameInput: 3,
					valueInput: 30
				}
			]
		};
	}

	getNewUniqueComponentInput(valuesArr){
		return {
            nameInput: valuesArr.length >= 1 ? Number(valuesArr[valuesArr.length - 1].nameInput) + 1 : 1,
            valueInput: 10,
            uniqueId: this.makeId()
		}
	}

    getCharacterNameByUrl(path) {
		switch (path) {
			case '/knights':
				return 'knight';
			case '/allies':
				return 'ally';
			case '/enemies':
				return 'enemy';
			case '/abilities':
				return 'ability';
			case '/levels':
				return 'level';
			case '/enemyWaves':
				return 'enemy wave';
			case '/settings':
				return 'settings';
			default:
				return 'entity';
		}
	}

    valuesToArray = (object) => {
		return object
		?
		Object.keys(object).map(key => ({
			uniqueId: this.makeId(),
			nameInput: key,
			valueInput: object[key]
		}))
		:
		[]
    };

    valuesToObject = (array) => {
		const values = Object.create(null);
		if (array)
			array.forEach( item => {
				values[item.nameInput] = item.valueInput;
			});
		return 	values;
    };

}