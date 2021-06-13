import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';

function Sidebar() {
	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar src='https://ak.picdn.net/shutterstock/videos/1024519640/thumb/4.jpg' />
				<div className='sidebar__headerRight'>
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>

					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlinedIcon />
					<input placeholder='Search or start new chat ' type='text' />
				</div>
			</div>
			<div className='sidebar__chats'>
				<SidebarChat />
				<SidebarChat />
				<SidebarChat />
			</div>
		</div>
	);
}

export default Sidebar;
