import React, {Component} from 'react';
import Table from "../components/knightsTable";
import AddButton from "../components/addButton";
import axios from "axios";

class ContentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            entity: '',
            tableComponentProps: {
                data: [],
                columns: []
            }
        };
    }

    makeId = () => {
        let text = 'ContentComponen';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    removeRecord = (entity, id) => {
        console.log('delete', entity, ' ', id);
        axios.delete(`http://178.128.163.251:5555/v1/${entity}/${id}`, {})
            .then(() => this.getData())
            .catch(function (error) {
                console.error(error);
            });
    };

    getData = (param) => {

        console.log('history', this.props.history.location.pathname.substr(1) );

        const slug = this.props.history.location.pathname.substr(1);

        this.setState({ entity: slug });

        // switch(param) {
        //     case 'knights':
            return axios
                .get('http://178.128.163.251:5555/v1/' + slug)
                .then(response => {
                    this.setState(() => {
                        return {
                            isLoaded: true,
                            tableComponentProps: {
                                data: response.data.map((entityItem)=>{
                                    console.log('entityItem', entityItem)
                                        let components = entityItem.components.map((componentItem)=>{
                                            let values = Object
                                                .keys(componentItem.values ? componentItem.values : [])
                                                .map(key=>
                                                    ({
                                                        name:key,
                                                        value:componentItem.values[key],
                                                        uniqueId: this.makeId()
                                                    })
                                                );
                                            return {...componentItem, values, uniqueId: this.makeId()}
                                        });
                                        return {...entityItem, components};
                                    }),
                                columns: ['Name', 'Components', 'Edit', 'Delete'],
                            }
                        };
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        // }
    };

    componentDidMount() {
        this.getData();
    };

    render() {
        return (
            <div className="container">
                <h2 className="col-50">{this.state.entity}</h2>
                <AddButton getData={this.getData}/>
                <button className="back-btn" onClick={this.props.history.goBack}>←</button>
                {
                    this.state.isLoaded
                    ?
                        <Table
                            getData={this.getData}
                            content={this.state.tableComponentProps}
                            removeRecord={this.removeRecord}
                            entity={this.state.entity} 
                        />
                    :
                        <h1>LOADING...</h1>
                }
            </div>
        );
    };
}

export default ContentComponent;