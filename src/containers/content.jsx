import React, {Component} from 'react';
import TableComponent from "../components/table";
import AddButton from "../components/addButton";

const axios = require("axios");

class ContentComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            data: {
                columns: ['Сharacter', 'Lorem #1', 'Lorem #2', 'Edit', 'Delete'],
                rows: [ ]
            }
        }
    }
    componentDidMount(){
        axios.get('http://178.128.163.251:5555/v1/knights')
            .then(heros => {
                const data= heros.data.map((item, index) => {
                    return {
                        'Сharacter': item.name,
                        'Lorem #1': 50,
                        'Lorem #2': 'lorem',
                        'Edit': '',
                        'Delete': ''
                    }
                })

                const rows = data.map(item => {
                    const obj = {};
                    this.state.data.columns.forEach( col => {
                        obj[col] = item[col];
                    })
                    return obj;
                })

               this.setState((prevState) => {
                   const newState = Object.assign({}, prevState);
                   newState.data.rows = rows;
                   return newState;

               })
            })
            .then(() => {
                this.setState({isLoaded: true})
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        return (
            <div className="container">
                <AddButton/>
                {
                    this.state.isLoaded

                    ?

                    <TableComponent data={this.state.data} />

                    :

                    <TableComponent data={this.state.data} />
                }
            </div>
        );
    }
}
export default ContentComponent;