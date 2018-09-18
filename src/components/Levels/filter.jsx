import React, {Component} from 'react';
import '../../App.css';
import Select from 'react-select';


class FilterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            backgroundsList: [],
            companyActsList: [],
            companyAct: null,
            background: null
        };
        this.notFilteredContent = null;
    }

    ApplyFilter = () => {
        this.notFilteredContent = Object.assign({}, this.state.content);

        this.props.resultCallBack(
            this.props.content.filter(item => {

                let companyActObject = {};
                let backgroundObject = {};
                item.forEach(element => {
                    if (element.name === 'companyAct') {
                        companyActObject = element;
                    }
                    if (element.name === 'background') {
                        backgroundObject = element;
                    }
                });

                if (this.state.companyAct && this.state.background) {
                    return (companyActObject.value === this.state.companyAct.value) &&
                           (backgroundObject.value === this.state.background.value)
                }

                if (this.state.companyAct && !this.state.background) {
                    return companyActObject.value === this.state.companyAct.value;
                }

                if (this.state.background && !this.state.companyAct) {
                    return backgroundObject.value === this.state.background.value
                }

                if (!this.state.background && !this.state.companyAct) {
                    return true
                }

            })
        )
    };

    clearFilter = () => {
        this.setState(prevSate => {
            return {
                ...prevSate,
                companyAct: null,
                background: null
            }
        });
        if (this.notFilteredContent)
            this.props.resultCallBack(this.props.content);
    };

    onSelectChange = (value, key) => {
        this.setState(prevSate => {
            return {
                ...prevSate,
                [key]: value
            }
        })
    };

    render() {
        return (
        <div className={'filter-component'}>
            <div className="add-btn-container m-col-50 filter-background">
                <div className={"filter-select-container select-width"}>
                    <Select
                        placeholder={"Select act..."}
                        isClearable
                        value={this.state.companyAct}
                        onChange={ value => this.onSelectChange(value, 'companyAct')}
                        options={this.props.companyActsList}
                    />
                </div>

                <div className={"filter-select-container select-width"}>
                    <Select
                        placeholder={"Select background..."}
                        isClearable
                        value={this.state.background}
                        onChange={ value => this.onSelectChange(value, 'background')}
                        options={this.props.backgroundsList}
                    />
                </div>

                <div className={"filter-select-container"}>
                    <button className="filter-button" onClick={this.ApplyFilter}>
                        <span>Apply Filter</span>
                    </button>
                </div>

                <div className={"filter-select-container"}>
                    <button className="filter-button" onClick={this.clearFilter}>
                        <span>Clear Filter</span>
                    </button>
                </div>
            </div>
        </div>
        );
    }
}

export default FilterComponent;