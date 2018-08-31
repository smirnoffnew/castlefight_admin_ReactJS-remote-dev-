import React, {Component} from 'react';
import CharactersFormComponent from "./CharactersFormComponent";
import Helper from "../../helper";
import axios from '../../axiosBaseUrlConfig';
import { withAlert } from "react-alert"

class CharactersForm extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
        this.state = {
            isEdit: this.props.isEdit,
            entity: this.props.entity,
            abilities: this.props.abilities,
            name: this.props.name,
            components: this.props.components
        };
    }

    componentDidMount() {
        // console.log('this.components CharactersForm state', this.state);
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
        this.setState((prevState) => {
            return {
                ...prevState,
                components: [
                  ...prevState.components,
                    this.helper.getUniqueAbility(this.state.abilities[0].type)
                ]
            }}
        );
    };

    deleteComponent = (componentId) => {
        this.setState((prevState) => {
            return {
                components: [...prevState.components.filter(item => item.uniqueId !== componentId)]
            }
        });
    };

    onSelectComponent = (componentId, selectedValue) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                components: [
                    ...prevState.components.map(
                        item => item.uniqueId === componentId
                            ?
                            this.helper.getUniqueAbility(selectedValue)
                            :
                            item
                    )
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
        const nameOrIdObject = {};
        const nameProperty = this.state.entity === 'abilities' ? 'id' : 'name';
        nameOrIdObject[nameProperty] = this.state.entity === 'abilities' ? Number(this.state.name) : this.state.name;
        axios
            .post(this.state.entity,
                {
                    "components": this.formaterData(this.state.components),
                    ...nameOrIdObject
                })
            .then(() => {
                this.props.alert.success(`${this.helper.getEntityNameByUrl(this.state.entity)} Successfully saved!`);
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
                            <h5 className="modal-title">Form</h5>
                        </div>
                        <div className="modal-body">
                            <button
                                type="reset"
                                onClick={this.addNewComponent}>
                                Add Component
                            </button>
                            <hr/>

                            <div className="name-input-container new-inputs-container">
                                <label style={{'marginRight': '15px'}}>Name:</label>
                                <input
                                    disabled={this.state.isEdit}
                                    type="text"
                                    value={this.state.name}
                                    onChange={(e) => this.changeNameValue(e)}
                                />
                            </div>
                            <hr/>
                            {
                                this.state.components.map((item) =>
                                    (<CharactersFormComponent
                                        key={item.uniqueId}
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

export default withAlert(CharactersForm);
