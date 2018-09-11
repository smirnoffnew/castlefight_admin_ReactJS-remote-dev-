import React, {Component} from 'react';
import Alert from 'react-s-alert';
import WavesTable from "../components/Waves/WavesTable";
import WavesModalForm from "../components/Waves/WavesModalForm";
import Loading from "../components/common/loading";
import axios from "../axiosBaseUrlConfig";
import Helper from "../helper";

class EnemyWaves extends Component {
    constructor(props) {
        super(props);
        this.helper = new Helper();
        this.state = {
            isLoaded: false,
            modalIsOpen: false,
            entity: '',
            enemyTypes: [],
            tableComponentProps: {
                data: []
            }
        };
    }

    onEdit = (content) => {
        let send = false;
        content.forEach((item) => {
            if (item.name === 'id') {
                send = true
            }
        });
        if (send) {
            let output = {};
            content.forEach((item) => {
                output[item.name] = item.value
            });
            axios
                .post(`/enemyWaves`, output)
                .then(() => {
                    Alert.success(
                        `${this.helper.getCharacterNameByUrl(this.state.entity)} Successfully saved!`
                    );
                    this.getData();
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else
            console.error('this entity can\'t be edit/save due to lack of id')
    };

    removeRecord = (id) => {
        if (id)
            axios
                .delete(`/enemyWaves/${id}`, {})
                .then(() => {
                    Alert.success(
                        `${this.helper.getCharacterNameByUrl(this.state.entity)} Successfully deleted!`
                    );
                    this.getData();
                })
                .catch(function (error) {
                    console.error(error);
                });
        else
            console.error('this entity can\'t be deleted due to lack of id')
    };

    getData = () => {
        axios
            .get('/enemyWaves')
            .then(response => {
                this.setState(prevState => {
                    const {data} = response;
                    return {
                        ...prevState,
                        entity: this.props.history.location.pathname.substr(1),
                        data: data ? data.map(value => {
                            let output = [];
                            for (const item in value) {
                                output.push({'name': item, 'value': value[item]});
                            }
                            return output;
                        }) : []
                    };
                });

                return this.getEnemies();
            })
            .then(response => {
                const {data} = response;
                this.setState(prevState => ({
                    ...prevState,
                    enemies: data ? data.map((value) => ({
                        value: value.id,
                        label: value.id + ': ' + value.name
                    })) : []
                }));

                return this.getEnemyTypes();
            })
            .then(response => {
                const {data} = response;
                this.setState(prevState => {
                    return {
                        ...prevState,
                        isLoaded: true,
                        enemyTypes: data ? data.map(item => {
                            return {label: item, value: item}
                        }) : []
                    }
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    getEnemies = () => axios.get('/enemies');

    getEnemyTypes = () => axios.get('enemies/types/');

    openModal = () => {
        this.setState({modalIsOpen: true});
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    componentDidMount() {
        this.getData();
        this.getEnemies();
    };

    componentWillReceiveProps() {
        this.getData();
        this.getEnemies();
    };

    render() {
        return (
            <div className="container">
                <h2 className="col-50">{this.state.entity}</h2>
                <div className="col-50 withButton">
                    <button onClick={this.openModal}>
                        Add Button
                    </button>
                </div>
                {
                    this.state.isLoaded
                        ?
                        <WavesTable
                            getData={this.getData}
                            content={this.state.data}
                            removeRecord={this.removeRecord}
                            entity={this.state.entity}
                            onEdit={this.onEdit}
                            enemies={this.state.enemies}
                        />
                        :
                        <Loading />
                }
                <WavesModalForm
                    isOpen={this.state.modalIsOpen}
                    onSave={this.onEdit}
                    closeModal={this.closeModal}
                    data={this.state.data}
                    enemies={this.state.enemies}
                    enemyTypes={this.state.enemyTypes}
                    emptyWaves
                />
            </div>
        )
    }
}

export default EnemyWaves;
