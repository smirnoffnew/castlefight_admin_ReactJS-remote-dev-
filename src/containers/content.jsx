import React, {Component} from 'react';

import TableComponent from "../components/table";
import AddButton from "../components/addButton";


const data = {
    columns: ['Сharacter', 'Skill #1', 'Skill #2', 'Edit', 'Delete'],
    rows: [{
        'Сharacter': 'Knight',
        'Skill #1': 50,
        'Skill #2': 'Speed',
        'Edit': '',
        'Delete': ''
    }, {
        'Сharacter': 'Bandit',
        'Skill #1': 50,
        'Skill #2': 'Damage',
        'Edit': '',
        'Delete': ''
    }, {
        'Сharacter': 'Knight',
        'Skill #1': 50,
        'Skill #2': 'Distance',
        'Edit': '',
        'Delete': ''
    }, {
        'Сharacter': 'Knight',
        'Skill #1': 50,
        'Skill #2': 'Speed',
        'Edit': '',
        'Delete': ''
    }]
};


class ContentComponent extends Component {

    render() {
        return (
            <div className="container">
                <AddButton/>
                <TableComponent data={data}/>
            </div>
        );
    }
}
export default ContentComponent;