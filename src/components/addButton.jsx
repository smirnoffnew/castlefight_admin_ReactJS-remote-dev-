import React, {Component} from 'react';
import addIcon from "../assets/images/icon-add.png";
import '../App.css';
import KnightFormComponent from "./knightFormComponent";
import Modal from "react-modal";

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

class AddButton extends Component {
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
            <div className="add-btn-container col-50">
                <button className="add-btn" onClick={this.openModal}>
                    <img src={addIcon} className="add-btn-icon" alt="Add"/>
                    <span>Add</span>
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <KnightFormComponent
                        getData={this.props.getData}
                        closeModal={this.closeModal}
                        components={[]}
                        name={'default_name'}/>
                </Modal>
            </div>
        );
    }
}

export default AddButton;