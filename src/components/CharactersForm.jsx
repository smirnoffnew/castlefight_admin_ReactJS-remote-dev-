import React, {Component} from 'react';
import CharactersFormComponent from "./CharactersFormComponent";
import Helper from "../helper";
import axios from 'axios';

class CharactersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abilities: this.props.abilities,
            name: this.props.name,
            components: this.props.components
        };
        this.helper = new Helper();
    }

    componentDidMount() {
        //console.log('this.components CharactersForm state', this.state.components);
        // console.log('this.components CharactersForm props', this.props.components);
    }

    formaterData = (components) => {
        return components.map((item) => {
            let values = {};
            item.values.forEach((inputItem) => {
                values[inputItem.nameInput] = inputItem.valueInput;
            });
            delete  item.uniqueId;
            return {...item, values}
        });
    };

    addNewComponent = () => {
        let generateNewFormElement = {
            ...this.state.abilities[0],
            uniqueId: this.helper.makeId(),
        };

        this.setState((prevState) => {
            return {
                ...prevState,
                components: [
                    ...prevState.components,
                    generateNewFormElement
                ]
            }}
        );

        this.setSelectComponent(generateNewFormElement.uniqueId, this.state.abilities[0])
    };

    deleteComponent = (componentId) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.filter(item => item.uniqueId !== componentId)]
            }
        });
    };

    onSelectComponent = (componentId, selectedValue) => {
        let componentSelect = this.state.abilities.filter(item => selectedValue.target.value === item.type)[0];
        this.setSelectComponent(componentId, componentSelect);
    };

    setSelectComponent = (componentId, componentSelect) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                components: [
                    ...prevState.components.map(item => item.uniqueId === componentId ? componentSelect : item)
                ]
            }
        })
    };

    addValueInput = (componentId) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((component) =>
                    component.uniqueId === componentId
                    ?
                    {
                        ...component,
                        values: [
                            ...component.values,
                            {
                                nameInput: component.values.length > 1 ? Number(component.values[component.values.length-1].nameInput) + 1 : 1,
                                valueInput: 10,
                                uniqueId: this.helper.makeId()
                            }
                        ]
                    }
                    :
                    component
                )]
            }
        });
    };

    deleteValueInput = (componentId, inputId) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((item) =>
                    item.uniqueId === componentId
                    ?
                    {
                        ...item,
                        values: item.values.filter(item => item.uniqueId !== inputId)
                    }
                    :
                    item
                )]
            }
        });
    };

    changeValueInput = (componentId, inputId, e, param) => {
        let eventTargetValue = e.target.value;
        this.setState((prevState) => {
            return {
                components: [...prevState.components.map((component) => {
                    if (component.uniqueId === componentId) {
                        let valueObject = {};
                        valueObject[`${param}Input`] = eventTargetValue;
                        return {
                            ...component,
                            values: component.values.map(inputItem =>(
                                        inputItem.uniqueId === inputId
                                        ?
                                        {
                                            ...inputItem,
                                            ...valueObject
                                        }
                                        :
                                        inputItem
                                    )),
                        }
                    } else {
                        return component;
                    }
                })]
            }
        });
    };

    saveForm = (e) => {
        e.preventDefault();
        axios
            .post('http://178.128.163.251:5555/v1/knights',
                {
                    "components": this.formaterData(this.state.components),
                    "name": this.state.name
                })
            .then(() => {
                this.props.getData();
                this.props.closeModal();
            })
    };

    changeNameValue = (e) => {
        let value = e.target.value;
        this.setState(prevState => (
            {
                ...prevState,
                name: value
            }
        ));
    };


    render() {
        return (
            <div>
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adding hero skills</h5>
                        </div>
                        <div className="modal-body">
                            <button
                                type="reset"
                                onClick={this.addNewComponent}>
                                Add Component
                            </button>
                            <div className="new-inputs">
                                <label style={{'marginRight': '15px'}}>Name:</label>
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={(e) => this.changeNameValue(e)}
                                />
                            </div>
                            <hr/>
                            {
                                this.state.components.map((item) =>
                                    (<CharactersFormComponent
                                        key={this.helper.makeId()}
                                        data={item}
                                        abilities={this.state.abilities}
                                        deleteComponent={() => this.deleteComponent(item.uniqueId)}
                                        onSelectComponent={this.onSelectComponent}
                                        addValueInput={() => this.addValueInput(item.uniqueId)}
                                        deleteValueInput={this.deleteValueInput}
                                        changeValueInput={this.changeValueInput}
                                    />)
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button
                                type="reset"
                                onClick={this.saveForm}
                                className="btn btn-save">
                                Save
                            </button>
                            <button
                                type="reset"
                                className="btn btn-close"
                                data-dismiss="modal"
                                onClick={this.props.closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CharactersForm;