import React, {Component} from 'react';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

const items = [
    <SidebarItem>Dashboard</SidebarItem>,
    <SidebarItem>Profile</SidebarItem>,
    <SidebarItem>Settings</SidebarItem>,
];

class SidebarComponent extends Component {
    render() {
        return (
            <div>
                <Sidebar content={items}>

                </Sidebar>
            </div>
        );
    }
}

export default SidebarComponent;