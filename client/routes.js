import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		);
	}
}

export default withRouter(Routes);
