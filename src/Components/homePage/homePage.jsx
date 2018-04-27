import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from '../../Common/header';
import UsersPage from '../users/usersPage';
import SingleUserPage from '../users/singleUserPage';
import ProfilePage from '../profile/profilePage';
import NewsFeedPage from '../newsFeed/newsFeedPage';
import SinglePostPage from '../singlePost/singlePostPage';

export const HomePage = () => (
	<div>
		<Header />

		<Switch>
			<Route exact path="/" component={NewsFeedPage} />
			<Route path="/feed/:type/:postId" component={SinglePostPage} />
			<Route exact path="/users" component={UsersPage} />
			<Route path="/users/:id" component={SingleUserPage} />
			<Route path="/profile" component={ProfilePage} />
		</Switch>
	</div>
);
