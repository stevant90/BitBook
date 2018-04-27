import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, NavItem, Nav } from 'react-bootstrap';

import { authenticationService } from '../Service/authenticationService';

export const Header = () => {
	const handleLogout = event => {
		authenticationService.logOut();
	};

	return (
		<Navbar inverse collapseOnSelect fixedTop={true}>
			<Navbar.Header>
				<Navbar.Brand>BitBook</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav pullRight>
					<NavItem eventKey={1} href="#/">
						Home
					</NavItem>
					<NavItem eventKey={2} href="#users">
						People
					</NavItem>
					<NavItem eventKey={2} href="#profile">
						Profile
					</NavItem>
					<NavItem eventKey={4}>
						<Button bsStyle="primary" onClick={handleLogout}>
							Logout
						</Button>
					</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
