import React, {Component} from 'react';
import addIcon from "../assets/images/icon-add.png";
import '../App.css';
import CharactersForm from "./CharactersForm";
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
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    };

    afterOpenModal = () => {
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

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
                    <CharactersForm
                        closeModal={this.closeModal}
                        components={[]}
                        name={'default_name'}
                        editFlag={false}
                        getData={this.props.getData}
                    />
                </Modal>
            </div>
        );
    }
}

export default AddButton;