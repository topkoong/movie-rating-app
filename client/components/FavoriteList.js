import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchMovies, deleteMovie } from '../store';
import StarRatingComponent from 'react-star-rating-component';

class FavoriteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: []
		};
		this.handleDelete = this.handleDelete.bind(this);
	}

	// componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
	// Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint,
	// this is a good place to instantiate the network request.

	async componentDidMount() {
		// Populating the favorite movie lists with data from DB
		await this.props.getMovies();
	}

	// Remove a movie from favorite movie lists

	handleDelete(movieId) {
		this.props.removeMovie(movieId);
	}

	render() {
		const { movies } = this.props;
		if (!movies) {
			return <Spinner style={{ width: '3rem', height: '3rem' }} />;
		}
		return (
			<Container className="my-5">
				<Row>
					{movies.map(movie => {
						const {
							id,
							title,
							year,
							poster,
							plot,
							imdbId,
							ratings
						} = movie;
						const movieId = Number(id);
						return (
							<Col xl="4" md="4" sm="6" xs="12" key={imdbId}>
								<div>
									<Card>
										<CardImg
											top
											width="100%"
											src={poster}
										/>
										<CardBody>
											<div className="mb-2 text-center">
												<h2>Rating: {ratings}</h2>
												<StarRatingComponent
													name="ratings"
													starCount={10}
													value={ratings}
													editing={false}
													renderStarIcon={() => (
														<span className="oi oi-star" />
													)}
												/>
											</div>
											<CardTitle>
												<b>Title:</b> {title}
											</CardTitle>
											<CardSubtitle>
												<b>Year:</b> {year}
											</CardSubtitle>
											<CardText>
												<b>Plot:</b> {plot}
											</CardText>
											<Link to={`/favorites/${movieId}`}>
												<Button>View</Button>
											</Link>
											<Button
												color="danger"
												className="ml-2"
												onClick={() =>
													this.handleDelete(movieId)
												}
											>
												Remove
											</Button>
										</CardBody>
									</Card>
								</div>
							</Col>
						);
					})}
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		movies: state.movies
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getMovies: () => dispatch(fetchMovies()),
		removeMovie: id => dispatch(deleteMovie(id))
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(FavoriteList)
);
