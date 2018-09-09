import React, {Component} from 'react';
import Modal from "react-modal";
import CharactersForm from "./CharactersForm";
import addIcon from "../../assets/images/icon-add.png";
import '../../App.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto !important'
    }
};

class AddButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            characterType: this.props.characterType,
            newRecord: this.props.newRecord,
            defaultComponentsList: this.props.defaultComponentsList
        };

    }

    toggleModal = () => {
        this.setState((prevState) => ({...prevState, modalIsOpen: !prevState.modalIsOpen}));
    };

    afterOpenModal = () => {

    };

    render() {
        return (
            <div className="add-btn-container col-50">

                <button className="add-btn"
                        onClick={this.toggleModal}>

                    <img src={addIcon}
                         className="add-btn-icon"
                         alt="Add"/>

                    <span>Add</span>
                </button>

                <Modal  isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        style={customStyles}
                        contentLabel={this.state.label}
                        ariaHideApp={false}>

                    <CharactersForm
                        isEdit={false}
                        characterType={this.props.characterType}
                        characterDataObject={this.state.newRecord}
                        defaultComponentsList={this.state.defaultComponentsList}
                        closeModalCallBack={this.toggleModal}
                        getDataCallBack={this.props.getDataCallBack}/>
                </Modal>
            </div>
        );
    }
}

export default AddButton;