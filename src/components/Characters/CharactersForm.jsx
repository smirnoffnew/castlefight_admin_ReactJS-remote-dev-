import React, { Component } from 'react';
import CharactersFormComponent from "./CharactersFormComponent";
import Helper from "../../helper";

class CharactersForm extends Component {
	constructor(props) {
		super(props);
		this.helper = new Helper();
		this.state = {
			isEdit: this.props.isEdit,
            characterType: this.props.characterType,
            characterDataObject: this.props.characterDataObject,
            defaultComponentsList: this.props.defaultComponentsList,
		};
	}

	componentDidMount() {
	}

	formatValuesInComponents = (components) => {
		return components.map( item => {
			return {
				...item,
				values: this.helper.valuesToObject(item.values)
			}
		});
	};

	addNewComponent = () => {
		this.setState( prevState => {
			return {
				...prevState,
                characterDataObject: {
					...prevState.characterDataObject,
                    components: [
                        ...prevState.characterDataObject.components,
                        this.helper.getNewUniqueComponent(this.state.defaultComponentsList[0].type)
                    ]
				}
			}
		});
	};

	deleteComponent = (componentId) => {
		this.setState((prevState) => {
			return {
                ...prevState,
                characterDataObject: {
					...prevState.characterDataObject,
                    components: [
                    	...prevState.characterDataObject.components.filter( item => item.uniqueId !== componentId)
					]
				}
			}
		});
	};

	onSelectComponent = (componentId, selectedValue) => {
        setTimeout(	() => this.setState( prevState => {
            return {
                ...prevState,
                characterDataObject: {
                    ...prevState.characterDataObject,
                    defaultValue: null,
                    components: [
                        ...prevState.characterDataObject.components.map(
                            item => item.uniqueId === componentId
                                ?
                                this.helper.getNewUniqueComponent(selectedValue)
                                :
                                item
                        )
                    ]
                },

            }
        }), 0);

	};

	addValueInput = (componentId) => {
		this.setState( prevState => {
			return {
				...prevState,
                characterDataObject: {
					...prevState.characterDataObject,
                    components: [...prevState.characterDataObject.components.map( component =>
                        component.uniqueId === componentId
                            ?
                            {
                                ...component,
                                defaultValue: null,
                                values: [
                                    ...component.values,
									this.helper.getNewUniqueComponentInput(component.values)
                                ]
                            }
                            :
                            component
                    )]
				}

			}
		});
	};

	deleteValueInput = (componentId, inputId) => {
		this.setState( prevState => {
			return {
                ...prevState,
                characterDataObject: {
                    ...prevState.characterDataObject,
                    components: [...prevState.characterDataObject.components.map( item =>
                        item.uniqueId === componentId
						?
						{
							...item,
                            defaultValue: null,
							values: item.values.filter(item => item.uniqueId !== inputId)
						}
						:
						item
                    )]
                }
			}
		});
	};

	changeValueInput = (componentId, inputId, value, param) => {
		this.setState( prevState => {
			return {
                ...prevState,
                characterDataObject: {
                    ...prevState.characterDataObject,
                    components: [...prevState.characterDataObject.components.map( component => {
                        if (component.uniqueId === componentId) {
                            let valueObject = {};
                            valueObject[`${param}Input`] = value;
                            return {
                                ...component,
                                defaultValue: null,
                                values: component.values.map(inputItem => (
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
			}
		});
	};

	changeDefaultValue = (componentId, value) => {
		this.setState( prevState => {
			return {
				...prevState,
                characterDataObject: {
                    ...prevState.characterDataObject,
                    components: [...prevState.characterDataObject.components.map( component => {
                        if (component.uniqueId === componentId) {
                            return {
                                ...component,
                                defaultValue: value,
								values: []
                            }
                        } else {
                            return component;
                        }
                    })]
                }
			}
		});
	};

    changeNameValue = (value) => {
        this.setState( prevState => {
            return {
                ...prevState,
                characterDataObject: {
                    ...prevState.characterDataObject,
                    name: value
                }
            }
        });
    };

    changeIdValue = (value) => {
        this.setState( prevState => {
            return {
                ...prevState,
                characterDataObject: {
                    ...prevState.characterDataObject,
                    id: value
                }
            }
        });
    };

    saveForm = (e) => {
        e.preventDefault();
        this.props.saveFormCallBack({
            ...this.state.characterDataObject,
            components: this.formatValuesInComponents(this.state.characterDataObject.components)
        });
        this.props.closeModalCallBack();
    };

	render() {

		return (
			<div>
				<form>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">
								{this.state.isEdit ? 'Edit' : 'Create'}
								&nbsp;
								{this.state.characterType}
							</h5>
						</div>
						<div className="modal-body">
							<button
								type="reset"
								onClick={this.addNewComponent}>
								Add Component
                            </button>
							<hr />

							{
                                this.props.characterType === 'knight'
								?
								null
								:
                                <div className="name-input-container new-inputs-container">
									<label style={{ 'marginRight': '15px' }}>id:</label>
									<input
										disabled={this.state.isEdit}
										type="text"
										value={this.state.characterDataObject.id}
										onChange={ e => this.changeIdValue(e.target.value)}
									/>
                                </div>
                            }

							{
                                this.props.characterType === 'ability'
								?
								null
								:
								<div className="name-input-container new-inputs-container">
									<label style={{ 'marginRight': '15px' }}>Name:</label>
									<input
										disabled={this.state.isEdit && this.state.characterType === "knight"}
										type="text"
										value={this.state.characterDataObject.name}
										onChange={ e => this.changeNameValue(e.target.value)}
									/>
								</div>
							}

							<hr />
							{
								this.state.characterDataObject.components.map( item =>
									<CharactersFormComponent
										key={item.uniqueId}
										component={item}
										defaultComponentsList={this.state.defaultComponentsList}
										deleteComponentCallBack={() => this.deleteComponent(item.uniqueId)}
										addValueInputCallBack={() => this.addValueInput(item.uniqueId)}
										onSelectComponentCallBack={this.onSelectComponent}
										deleteValueInputCallBack={this.deleteValueInput}
										changeValueInputCallBack={this.changeValueInput}
										changeDefaultValueCallBack={this.changeDefaultValue}
									/>
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
								onClick={this.props.closeModalCallBack}>
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
