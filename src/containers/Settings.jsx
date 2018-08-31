import React, { Component } from 'react';
import Loading from "../components/common/loading";
import axios from "../axiosBaseUrlConfig";
import Helper from "../helper";
import { withAlert } from "react-alert"

class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
        this.state = {
            isLoaded: false,
            entity: '',
            formData: {
                initialFarmCount: "",
                farmIndexAndOutputs: [],
                farmIndexAndCosts: [],
                farmIndexAndPositions: []
            },
            oldFormData:{
                initialFarmCount: "",
                farmIndexAndOutputs: [],
                farmIndexAndCosts: [],
                farmIndexAndPositions: []
            },
        };
    }

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps() {
        this.getData();
    }

    getData = () => {
        axios
            .get('/commons/farm/')
            .then(response => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        formData: {
                            initialFarmCount: response.data.initialFarmCount,
                            farmIndexAndOutputs : this.dataFormatterToDisplay( response.data.farmIndexAndOutputs ),
                            farmIndexAndCosts : this.dataFormatterToDisplay( response.data.farmIndexAndCosts ),
                            farmIndexAndPositions : this.dataFormatterToDisplay( response.data.farmIndexAndPositions ),
                        },
                        oldFormData: {
                            initialFarmCount: response.data.initialFarmCount,
                            farmIndexAndOutputs : this.dataFormatterToDisplay( response.data.farmIndexAndOutputs ),
                            farmIndexAndCosts : this.dataFormatterToDisplay( response.data.farmIndexAndCosts ),
                            farmIndexAndPositions : this.dataFormatterToDisplay( response.data.farmIndexAndPositions ),
                        },
                        isLoaded: true
                    }
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    saveData = () => {
        axios
            .post(
                '/commons/farm/',
                {
                    initialFarmCount: this.state.formData.initialFarmCount,
                    farmIndexAndOutputs: this.dataFormatterToSave(this.state.formData.farmIndexAndOutputs),
                    farmIndexAndCosts: this.dataFormatterToSave(this.state.formData.farmIndexAndCosts),
                    farmIndexAndPositions: this.dataFormatterToSave(this.state.formData.farmIndexAndPositions),
                }
            )
            .then(() => {
              this.props.alert.success("Successfully saved!")
              this.getData()
            });
    };

    resetData = () => {
        this.setState((prevState) => {
            return {
                ...prevState,
                formData: Object.assign({}, prevState.oldFormData)
            }
        })
    };

    dataFormatterToDisplay = (objectData) => {
        return Object.keys(objectData).map(key=>({
            uniqueId: this.helper.makeId(),
            nameInput: key,
            valueInput: objectData[key]
        }))
    };

    dataFormatterToSave = (arrayData) => {
        let objectData = {};

        arrayData.forEach(item=>{
            if (typeof item.valueInput === 'object') {
                objectData[item.nameInput] = {
                    x: Number(item.valueInput.x),
                    y: Number(item.valueInput.y),
                }
            } else {
                objectData[item.nameInput] = Number(item.valueInput);
            }
        });
        return objectData;
    };

    addInput = (arrayName, isValues) => {
        let newDataObject = {
            nameInput: Number(this.state.formData[arrayName][this.state.formData[arrayName].length - 1].nameInput) + 1,
            uniqueId: this.helper.makeId(),
        };
        isValues ? newDataObject.valueInput = {x: 0, y: 0} : newDataObject.valueInput = 0;

        this.setState((prevState) => {
            let arrayDataObject = {};
            arrayDataObject[arrayName] = prevState.formData[arrayName];
            arrayDataObject[arrayName].push(newDataObject);
            return {
                ...prevState,
                formData: {
                    ...prevState.formData,
                    ...arrayDataObject
                }
            }
        });
    };

    changeInput = (arrayName, uniqueId, nameProperty, value, isValues) => {
        this.setState((prevState) => {
            let newArray = arrayName === 'initialFarmCount' ? uniqueId : prevState.formData[arrayName].map(item=>{
                if (item.uniqueId === uniqueId) {
                    let inputDataObject = {};
                    if (isValues) {
                        inputDataObject.valueInput = item.valueInput;
                        inputDataObject.valueInput[nameProperty] = value;
                    } else {
                        inputDataObject[nameProperty] = value;
                    }
                    return {
                        ...item,
                        ...inputDataObject
                    }
                } else {
                    return item;
                }
            });

            let arrayDataObject = {};
            arrayDataObject[arrayName] = newArray;
            return {
                ...prevState,
                formData : {
                    ...prevState.formData,
                    ...arrayDataObject
                }
            }
        })

    };

    deleteInput = (arrayName, uniqueId) => {
        this.setState((prevState) => {
            let arrayDataObject = {};
            arrayDataObject[arrayName] = prevState.formData[arrayName].filter(item=>item.uniqueId !== uniqueId);
            return {
                ...prevState,
                formData : {
                    ...prevState.formData,
                    ...arrayDataObject
                }
            }
        })
    };

    renderCommonInputs = (arrayName, data) => {
        return data.map(item => (
            <div key={item.uniqueId} className="editable-list-input-container">
                <input
                    type="text"
                    value={item.nameInput}
                    onChange={(e) => this.changeInput(arrayName, item.uniqueId, 'nameInput', e.target.value, false)}
                />
                <input
                    type="text"
                    value={item.valueInput}
                    onChange={(e) => this.changeInput(arrayName, item.uniqueId, 'valueInput', e.target.value, false)}
                />
                <button
                    type="reset"
                    onClick={() => this.deleteInput(arrayName, item.uniqueId)}>
                    delete prop
                </button>
            </div>
        ));
    };

    renderPositionsInputs = (arrayName, data) => {
        return data.map(item => (
            <div key={item.uniqueId} className="editable-list-input-container">
                <input
                    type="text"
                    value={item.nameInput}
                    onChange={(e) => this.changeInput(arrayName, item.uniqueId, 'nameInput', e.target.value, false)}
                />

                <input
                    type="text"
                    value={item.valueInput.x}
                    onChange={(e) => this.changeInput(arrayName, item.uniqueId, 'x', e.target.value, true)}
                />

                <input
                    type="text"
                    value={item.valueInput.y}
                    onChange={(e) => this.changeInput(arrayName, item.uniqueId, 'y', e.target.value, true)}
                />

                <button
                    type="reset"
                    onClick={() => this.deleteInput(arrayName, item.uniqueId)}>
                    delete prop
                </button>
            </div>
        ));
    };

    render() {
        return (
            <div className="container">
                {
                    this.state.isLoaded
                    ?
                    <form>
                        <div className="form-container">

                            {/*initialFarmCount*/}
                            <div className={'new-inputs-container'}>
                                <h2>initial Farm Count</h2>
                                <input
                                    type="text"
                                    value={this.state.formData.initialFarmCount}
                                    onChange={(e)=>this.changeInput('initialFarmCount', e.target.value)}
                                />
                            </div>
                            <hr/>

                            {/*farmIndexAndOutputs*/}
                            <div className={'new-inputs-container'}>
                                <h2>farm Index And Outputs</h2>
                                { this.renderCommonInputs('farmIndexAndOutputs', this.state.formData.farmIndexAndOutputs) }
                            </div>

                            <div className="add-new-input-btn-container">
                                <button type="reset"
                                        onClick={()=>this.addInput('farmIndexAndOutputs', false)}
                                        className="btn btn-save">Add
                                </button>
                            </div>
                            <hr/>

                            {/*farmIndexAndCosts*/}
                            <div className={'new-inputs-container'}>
                                <h2>farm Index And Costs</h2>
                                { this.renderCommonInputs('farmIndexAndCosts', this.state.formData.farmIndexAndCosts) }
                            </div>

                            <div className="add-new-input-btn-container">
                                <button type="reset"
                                        onClick={()=>this.addInput('farmIndexAndCosts', false)}
                                        className="btn btn-save">Add
                                </button>
                            </div>
                            <hr/>

                            {/*farmIndexAndPositions*/}
                            <div className={'new-inputs-container'}>
                                <h2>farm Index And Positions</h2>
                                <div>
                                    <div className={'custom-label'}>Name</div>
                                    <div className={'custom-label'}>X</div>
                                    <div className={'custom-label'}>Y</div>
                                    <div className={'phantom-div'}></div>
                                </div>
                                { this.renderPositionsInputs('farmIndexAndPositions', this.state.formData.farmIndexAndPositions) }
                            </div>

                            <div className="add-new-input-btn-container">
                                <button type="reset"
                                        onClick={()=>this.addInput('farmIndexAndPositions', true)}
                                        className="btn btn-save">Add
                                </button>
                            </div>
                            <hr/>

                            {/*form buttons*/}
                            <div className="modal-footer">
                                <button type="reset"
                                        onClick={()=>this.saveData()}
                                        className="btn btn-save">Save
                                </button>
                                <button type="reset"
                                        className="btn btn-close"
                                        onClick={()=>this.resetData()}>Reset
                                </button>
                            </div>
                        </div>
                    </form>
                    :
                    <Loading />
                }
            </div>
        )
    }
}

export default withAlert(TableContainer);
