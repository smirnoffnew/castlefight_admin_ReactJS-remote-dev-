import React, {Component} from 'react';
import Helper from "../helper";

class CharactersFormComponent extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
    }
    render() {
        return (
            <div>
                <div className="remove-component">
                    <button type="reset" onClick={this.props.deleteComponent} >delete select</button>
                </div>

                <div className="select-container">
                    <select
                        value={this.props.data.type}
                        onChange={(e)=>this.props.onSelectComponent(this.props.data.uniqueId, e)}>
                        {
                            this.props.abilities.map((item) =>
                                <option
                                    key={this.helper.makeId()}
                                    value={item.type} >
                                    {item.type}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div>
                    {/*<div className="new-inputs" style={{'width':'90%', 'margin':'auto'}}>*/}
                        {/*<label style={{'marginRight':'75px'}}>Name property</label>*/}
                        {/*<label>Value property</label>*/}
                    {/*</div>*/}
                    {
                        this.props.data.values.map(item => (
                            <div key={item.uniqueId} className="new-inputs-container">
                                <input
                                    type="text"
                                    value={item.nameInput}
                                    onChange={(e) => this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'name')}
                                />
                                <input
                                    type="text"
                                    value={item.valueInput}
                                    onChange={(e) => this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'value')}
                                />
                                <button type="reset"
                                        onClick={() => this.props.deleteValueInput(this.props.data.uniqueId, item.uniqueId)}>delete prop {this.props.data.uniqueId}
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div className="add-new-input-btn-container">
                    <button type="reset" onClick={()=>this.props.addValueInput(this.props.data.uniqueId)}>+1</button>
                </div>
                <hr/>
            </div>

        )
    }
}

export default CharactersFormComponent;