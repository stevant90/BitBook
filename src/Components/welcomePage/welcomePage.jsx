import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import LoginPage from './loginPage';
import RegisterPage from './registerPage';
import { Welcome } from './welcome';
import { HomePage } from '../homePage/homePage';
import { authenticationService } from '../../Service/authenticationService';

export const WelcomePage = () => {
	if (authenticationService.isAuthenticated()) {
		return (
			<Switch>
				<Redirect from="/loginPage" exact to="/" />
				<Route path="/" component={HomePage} />
			</Switch>
		);
	}

	return (
		<Grid>
			<Row className="start-display">
				<Col xs={12} md={7}>
					<Welcome />
				</Col>
				<Col xs={12} md={5} className="form">
					<Link to="/loginPage">
						<Button bsSize="large" bsStyle="primary">
							Login Page
						</Button>
					</Link>
					<Link to="/RegisterPage">
						<Button bsSize="large" bsStyle="primary">
							Register Page
						</Button>
					</Link>
					<Switch>
						<Route path="/loginPage" component={LoginPage} />
						<Route path="/registerPage" component={RegisterPage} />
						<Redirect from="/" to="/loginPage" />
					</Switch>
				</Col>
			</Row>
		</Grid>
	);
};
