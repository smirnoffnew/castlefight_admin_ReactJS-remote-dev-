import React, {Component} from 'react';
import Modal from "react-modal";
import CharactersForm from "./CharactersForm";
import editIconPath from "../../assets/images/edit-icon.png";
import '../../App.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

class EditButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };
    }

    toggleModal = () => {
        this.setState((prevState) => ({...prevState, modalIsOpen: !prevState.modalIsOpen}));
    };

    afterOpenModal = () => {

    };

    render() {
        return (
            <div>
                <button className={`edit-btn`}
                        onClick={this.toggleModal}>

                    <img src={editIconPath}
                         className={'edit-btn-icon'}
                         alt="Edit"/>
                </button>

                <Modal  isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        style={customStyles}
                        ariaHideApp={false}>

                    <CharactersForm
                        isEdit={true}
                        characterType={this.props.characterType}
                        characterDataObject={this.props.record}
                        defaultComponentsList={this.props.defaultComponentsList}
                        closeModalCallBack={this.toggleModal}
                        getDataCallBack={this.props.getDataCallBack}
                        saveFormCallBack={this.props.saveFormCallBack}/>
                </Modal>
            </div>
        );
    }
}

export default EditButton;
