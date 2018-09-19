import React, {Component} from 'react';
import '../../App.css';
import Select from 'react-select';


class FilterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            levels: [],
            selectedLevel: null
        };
        this.notFilteredContent = null;
    }

    ApplyFilter = () => {

        let selectedLevelObject =
            this.state.selectedLevel
                ?
                this.props.levels.find(level => level.id === this.state.selectedLevel.value)
                :
                null;

        this.props.resultCallBack(
            selectedLevelObject
                ?
                this.props.content.filter(wave => {

                    let waveId = '';
                    let isWaveExist = false;

                    wave.every(element => {
                        if (element.name === 'id') {
                            waveId = element.value;
                            return false;
                        } else {
                            return true;
                        }
                    });

                    if (selectedLevelObject && selectedLevelObject.enemyWaveIds !== null) {
                        selectedLevelObject.enemyWaveIds.forEach(item => {
                            if (item === waveId) {
                                isWaveExist = true;
                            }
                        });
                    }

                    return isWaveExist;
                })
                :
                //need for detect waves without levels
                this.props.content.filter(wave => {

                    let levelsIdArr = this.props.levels.map(level=>level.enemyWaveIds);
                    let exist = false;

                    let waveId = '';
                    wave.every(element => {
                        if (element.name === 'id') {
                            waveId = element.value;
                            return false;
                        } else {
                            return true;
                        }
                    });

                    levelsIdArr.forEach(itemArr=>{
                        exist = exist ? exist : itemArr ? itemArr.indexOf(waveId) > 0 : false;
                    });

                    return exist;
                })
        );

    };

    clearFilter = () => {
        this.setState(prevSate => {
            return {
                ...prevSate,
                selectedLevel: null
            }
        });
        this.props.resultCallBack(this.props.content);
    };

    onSelectChange = (value) => {
        this.setState(prevSate => {
            return {
                ...prevSate,
                selectedLevel: value
            }
        })
    };

    render() {
        return (
            <div className={'filter-component'}>
                <div className="add-btn-container m-col-50 filter-background">

                    <div className={"filter-select-container select-width"}>
                        <Select
                            placeholder={"Select level..."}
                            isClearable
                            value={this.state.selectedLevel}
                            onChange={ value => this.onSelectChange(value)}
                            options={this.props.levels.map(level=>({label:level.id,value:level.id}))}
                        />
                    </div>

                    <div className={"filter-select-container"}>
                        <button className="filter-button" onClick={this.ApplyFilter}>
                            <span>Apply Filter</span>
                        </button>
                    </div>

                    <div className={"filter-select-container"}>
                        <button className="filter-button" onClick={this.clearFilter}>
                            <span>Clear Filter</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterComponent;