import React, {Component} from 'react';
import editIcon from "../assets/images/edit-icon.svg"
import "../assets/main.scss"
import '../App.css';

import Modal from "react-modal";
import FormComponent from "./form";

const editButtonStyles = {
    content : {
        top        : '50%',
        left       : '50%',
        right      : 'auto',
        bottom     : 'auto',
        marginRight: '-50%',
        transform  : 'translate(-50%, -50%)',
    }
};

class EditButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    render() {
        return (
            <div>
                <button className="edit-btn"  onClick={this.openModal}>
                    <img src={editIcon} alt="Edit" className="edit-btn-icon"/>
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    // onRequestClose={this.closeModal}
                    style={editButtonStyles}
                    contentLabel="Example Modal"
                >
                    <FormComponent closeModal={this.closeModal}/>
                </Modal>
            </div>
        );
    }
}

export default EditButton;