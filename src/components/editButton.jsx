import React, {Component} from 'react';
import editIcon from "../assets/images/edit-icon.svg";
import '../App.css';

import Modal from "react-modal";
// import FormComponent from "./form";
import EditFormComponent from "./editForm";

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
            editModalIsOpen: false
        };

        this.openEditModal = this.openEditModal.bind(this);
        this.afterOpenEditModal = this.afterOpenEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
    }

    openEditModal() {
        this.setState({editModalIsOpen: true});
    }
    afterOpenEditModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }
    closeEditModal() {
        this.setState({editModalIsOpen: false});
    }
    render() {
        return (
            <div>
                <button className="edit-btn" onClick={this.openEditModal}>
                    <img src={editIcon} alt="Edit" className="edit-btn-icon"/>
                </button>
                <Modal
                    isOpen={this.state.editModalIsOpen}
                    onAfterOpen={this.afterOpenEditModal}
                    // onRequestClose={this.closeModal}
                    style={editButtonStyles}
                    contentLabel="Example Modal"
                >
                    <EditFormComponent closeEditModal={this.closeEditModal}/>
                </Modal>
            </div>
        );
    }
}

export default EditButton;