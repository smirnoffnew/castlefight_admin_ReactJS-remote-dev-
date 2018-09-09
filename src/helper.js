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
					"count": 3,
					"summonEnemyTimeS": 5.0,
					"createNewCycleTimeS": 10.0,
					"delayBeforeStartS": 0
				},
				"normalSummonCycle": {
					"count": 1,
					"summonEnemyTimeS": 10.0,
					"createNewCycleTimeS": 25.0,
					"delayBeforeStartS": 10.0
				},
				"hardSummonCycle": {
					"count": 0,
					"summonEnemyTimeS": 15.0,
					"createNewCycleTimeS": 30.0,
					"delayBeforeStartS": 10.0
				},
				"bossSummonCycle": {
					"count": 1,
					"summonEnemyTimeS": 20.0,
					"createNewCycleTimeS": 0.0,
					"delayBeforeStartS": 40.0
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

	getCharacterDefaultModel(characterType){
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
                    "components" : []
                };
            case 'ally':
                return  {
                    "id" : this.makeNumberId,
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
                    "components" : []
                };
            case 'enemy':
                return {
                    "id" : this.makeNumberId,
                    "name" : this.makeRandomName(),
                    "components" : []
                };
            case 'ability':
                return {
                    "id" : this.makeNumberId,
                    "components" : []
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

}


// "components" : [
//     {
//         "type" : "com.anygames.castlefight.components.Hp",
//         "defaultValue" : null,
//         "values" : {
//             "1" : 20.0,
//             "2" : 30.0,
//             "3" : 40.0
//         }
//     },
//
//     {
//         "type" : "com.anygames.castlefight.components.HpReg",
//         "defaultValue" : null,
//         "values" : {
//             "1" : 1,
//             "2" : 30.0,
//             "3" : 40.0
//         }
//     },
//
//     {
//         "type" : "com.anygames.castlefight.components.Speed",
//         "defaultValue" : null,
//         "values" : {
//             "1" : 10.0,
//             "2" : 70.0,
//             "3" : 10.0
//         }
//     },
//
//     {
//         "type" : "com.anygames.castlefight.components.Cooldown",
//         "defaultValue" : null,
//         "values" : {
//             "1" : 60.0,
//             "2" : 70.0,
//             "3" : 10.0
//         }
//     },
//
//     {
//         "type" : "com.anygames.castlefight.components.RangeAttackRadius",
//         "defaultValue" : 20,
//         "values" : null
//     },
//
//     {
//         "type" : "com.anygames.castlefight.components.RangeDps",
//         "defaultValue" : null,
//         "values" : {
//             "1" : 1.0,
//             "2" : 70.0,
//             "3" : 10.0
//         }
//     },
//
//     {
//         "type" : "com.anygames.castlefight.components.MeleeAttackRadius",
//         "defaultValue" : 2,
//         "values" : null
//     },
//
//
//     {
//         "type" : "com.anygames.castlefight.components.MeleeDps",
//         "defaultValue" : null,
//         "values" : {
//             "1" : 10.0,
//             "2" : 70.0,
//             "3" : 10.0
//         }
//     }
// ],