import React, { Component } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import Helper from '../../helper';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto'
  }
};

class WavesModalForm extends Component {
  constructor(props) {
    super(props);
    this.helper = new Helper();

    this.state = {
      values: props.values ? props.values : {},
      isEdit: this.props.isEdit,
      enemyTypes: this.props.enemyTypes
    };
  }

  componentWillReceiveProps() {
    if (this.props.data && this.props.emptyWaves) {
      let temp = [], values = [];
      temp = this.helper.waves(this.props.data);
      for (let item in temp) {
        values.push({ name: item, value: temp[item] });
      }
      this.setState({ values });
    }
  }

  handleChange(e, index, id) {
    const value = e.target.value;
    this.setState(prevState => {
      if (id) {
        prevState.values[index].value[id] = value;
      } else {
        prevState.values[index].value = value;
      }
      return { prevState };
    });
  }

  handleChangeId(e, index, type, key) {
    const value =
      typeof e === 'string' || typeof e === 'number' ? e : e.target.value;
    if (type === 'id') {
      this.setState(prevState => {
        let values = Object.keys(prevState.values[index].value).filter(item => item !== key);
        let output = {};
        values.forEach(item => (output[item] = prevState.values[index].value[item]));
        output[value] = prevState.values[index].value[key];
        prevState.values[index].value = output;
        return prevState;
      });
    } else {
      this.setState(prevState => {
        Object.keys(prevState.values[index].value).forEach(item => {
          if (item === key) {
            prevState.values[index].value[key][type] = value;
          }
        });
        return prevState;
      });
    }
  }

  handleAddWave(e, index) {
    e.preventDefault();
    this.setState(prevState => {
      let biggest = 0;
      Object.keys(prevState.values[index].value).forEach(item => {
        if (parseInt(item, 10) && parseInt(item, 10) > biggest)
          biggest = parseInt(item, 10);
      });
      prevState.values[index].value[biggest + 1] = {
        type: 'Normal',
        count: 10
      };
      return prevState;
    });
  }

  handleDelete(e, index, key) {
    e.preventDefault();
    this.setState(prevState => {
      let values = Object.keys(prevState.values[index].value).filter(item => item !== key);
      let output = {};
      values.forEach(item => (output[item] = prevState.values[index].value[item]));
      prevState.values[index].value = output;
      return prevState;
    });
  }

  setValueSelect = (enemies, enemyId) => {
    let currentEnemy = enemies.filter(enemy => enemy.value === Number(enemyId))[0];
    let defaultEnemy = enemies.length === 0 ? {value:1, label:'no enemies'} : enemies[0];
    return currentEnemy ? {value: enemyId, label: currentEnemy.label} : {value:defaultEnemy.value, label:defaultEnemy.label};
  };

  getInputs() {
    if (Array.isArray(this.state.values) && this.state.values.length > 0) {
      return this.state.values.map((column, index) => {
        if (typeof column.value === 'object' && column.name !== 'enemyIdsAndCount') {
          return (
            <tr key={index}>
              <td>{column.name}</td>
              <td>
                {Object.keys(column.value).map((key, id) => (
                  <label key={id}>
                    {key === 'enemyWaveIds' ? null : key + ': '}
                  </label>
                ))}
              </td>
              <td>
                {Object.keys(column.value).map((key, id) => {
                  return (
                    <React.Fragment key={id}>
                      <input
                        onChange={e =>
                          this.handleChange(e, index, key)
                        }
                        type="number"
                        value={column.value[key]}
                      />
                      <br />
                    </React.Fragment>
                  );
                })}
              </td>
            </tr>
          );
        } else if (column.name === 'enemyIdsAndCount') {
          return (
            <tr key={index}>
              <td>{column.name}</td>
              <td colSpan="2">
                <div className="AddWave-button">
                  <button onClick={e => this.handleAddWave(e, index)}>
                    add new
                  </button>
                </div>
                {Object.keys(column.value).map((key, id) => {

                  return (
                    <div key={id} className="three-inputs">
                      <Select
                        className="select-3"
                        value={this.setValueSelect(this.props.enemies, key)}
                        onChange={e =>
                          this.handleChangeId(e.value, index, 'id', key)
                        }
                        options={this.props.enemies}
                        placeholder={'Select enemy...'}
                      />
                      <Select
                        className="select-3"
                        value={{
                          value: column.value[key].type,
                          label: column.value[key].type
                        }}
                        onChange={e =>
                          this.handleChangeId(e.value, index, 'type', key)
                        }
                        options={this.props.enemyTypes}
                      />
                      <input
                        onChange={e =>
                          this.handleChangeId(e, index, 'count', key)
                        }
                        type="number"
                        className="select-input"
                        value={column.value[key].count}
                      />

                      <button onClick={e => this.handleDelete(e, index, key)}>
                        x
                      </button>
                    </div>
                  );
                })}
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={index}>
              <td>{column.name}</td>
              <td colSpan="2">
                <input
                  onChange={e => this.handleChange(e, index)}
                  type="number"
                  value={column.value}
                  disabled={column.name === 'id' ? this.state.isEdit : false}
                />
              </td>
            </tr>
          );
        }
      });
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        style={customStyles}
      >
        <form>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Wave</h5>
            </div>
            <div className="modal-body">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th colSpan="2">Value</th>
                  </tr>
                </thead>
                <tbody>{this.getInputs()}</tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-save"
                type="reset"
                onClick={() => {
                  this.props.closeModal();
                  this.props.onSave(this.state.values);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-close"
                type="reset"
                onClick={this.props.closeModal}
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

export default WavesModalForm;
