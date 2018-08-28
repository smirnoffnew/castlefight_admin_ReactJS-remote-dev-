import React, {Component} from 'react';

class CharactersFormComponent extends Component {
    render() {
        return (
            <div>
                <div className="btn-remove-select">
                    <button type="reset" onClick={this.props.deleteComponent} >delete select</button>
                </div>

                <div style={{'height': '40px'}}>
                    <select
                        className="select-skill"
                        value={this.props.data.type}
                        onChange={(e)=>this.props.onSelectComponent(this.props.data.uniqueId, e)}>
                        {
                            this.props.abilities.map((item) =>
                                <option
                                    key={item.uniqueId}
                                    value={item.type} >
                                    {item.type}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="new-inputs" style={{'width':'90%', 'margin':'auto'}}>
                    <label style={{'marginRight':'75px'}}>Name property</label>
                    <label>Value property</label>
                </div>
                {
                    this.props.data.values.map(item => (
                        <div key={item.uniqueId} className="new-inputs">
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
                                    onClick={() => this.props.deleteValueInput(this.props.data.uniqueId, item.uniqueId)}>delete prop
                            </button>
                        </div>
                    ))
                }
                <div className="btn-edit-input">
                    <button type="reset" onClick={()=>this.props.addValueInput(this.props.data.uniqueId)}>+1</button>
                </div>
                <hr/>
            </div>

        )
    }
}

export default CharactersFormComponent;