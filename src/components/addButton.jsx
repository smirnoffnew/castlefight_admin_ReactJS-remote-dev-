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
            modalIsOpen: false,
            abilities: this.props.abilities
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
                <button className="add-btn" onClick={this.toggleModal}>
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
                        entity={this.props.entity}
                        abilities={this.state.abilities}
                        name={'default_name'}
                        components={[]}
                        closeModal={this.toggleModal}
                        getData={this.props.getData}/>
                </Modal>
            </div>
        );
    }
}

export default AddButton;