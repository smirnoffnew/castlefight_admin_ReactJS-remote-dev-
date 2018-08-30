export default class Helper {
    waves() {
        return (
            {
                "id": this.makeNumberId(),
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
                "enemyWaveIds": [1]
            }
        )
    }

    makeId() {
        let text = '';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    makeNumberId() {
        let text = '';
        let possible = "0123456789";
        for (let i = 0; i < 9; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    getUniqueAbility(type) {
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

}