import React, {Component} from 'react';
import Modal from "react-modal";
import FormComponent from "./form";
import addIconPath from "../assets/images/icon-add.png";
import editIconPath from "../assets/images/edit-icon.png";
import '../App.css';



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

class ButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            label: 'add',
            data: {}
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
            <div className={this.props.label === 'add' ? 'add-btn-container col-50' : ''}>
                <button className={`${this.props.label}-btn`} onClick={this.openModal}>
                    <img src={this.props.label === 'add' ? addIconPath : editIconPath}
                         className={`${this.props.label}-btn-icon`}
                         alt="Add"/>
                </button>
                <Modal  isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        style={customStyles}
                        contentLabel={this.state.label}
                        ariaHideApp={false}>

                    <FormComponent closeModal={this.closeModal}
                                   components={this.props.data.components}
                                   name={this.props.data.name}/>
                </Modal>
            </div>
        );
    }
}

export default ButtonComponent;