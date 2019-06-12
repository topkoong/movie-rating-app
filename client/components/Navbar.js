import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem
} from 'reactstrap';

const linkStyle = {
	color: '#fff',
	paddingRight: '.5rem',
	paddingLeft: '.5rem',
	textDecoration: 'none',
	display: 'block',
	padding: '.5rem 1rem',
	margin: '1em'
};

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState(prevState => {
			return {
				isOpen: !prevState.isOpen
			};
		});
	}
	render() {
		return (
			<div>
				<Navbar className="navbar-dark bg-dark" expand="md">
					<NavbarBrand href="/">Carver Edison</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink to="/favorites" style={linkStyle}>
									My Favorite movies
								</NavLink>
							</NavItem>
							<NavItem>
								<a
									classNamme="nav-link"
									target="_blank"
									href="https://github.com/topkoong/movie-rating-app"
									style={linkStyle}
								>
									GitHub Repo
								</a>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default withRouter(NavBar);
