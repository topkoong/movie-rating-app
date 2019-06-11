import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Home, FavoriteList, Movie } from './components/index';

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/favorites" component={FavoriteList} />
				<Route exact path="/favorites/:id" component={Movie} />
				<Route exact path="/" component={Home} />
			</Switch>
		);
	}
}

export default withRouter(Routes);
