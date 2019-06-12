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
	Spinner,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Form,
	FormGroup,
	Input,
	Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSingleMovie, createComment, updatedMovie } from '../store';
import StarRatingComponent from 'react-star-rating-component';

class Movie extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
			content: '',
			ratings: 0,
			editRatings: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEditRating = this.handleEditRating.bind(this);
		this.handleRatingsClick = this.handleRatingsClick.bind(this);
	}
	// componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
	// Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint,
	// this is a good place to instantiate the network request.

	async componentDidMount() {
		// Populating the a single movie with data from DB
		const movieId = this.props.match.params.id;
		await this.props.getMovie(movieId);
		const { movie } = this.props;
		if (movie) {
			this.setState({
				movie,
				ratings: movie.ratings
			});
		}
	}

	// Handles selected ratings when ratings are clicked.

	handleRatingsClick(nextValue, prevValue, name) {
		this.setState(prevState => {
      return {
        ratings: nextValue,
        editRatings: !prevState.editRatings
      };
    },() => {
				const movieId = this.props.match.params.id;
				const { ratings } = this.state;
				const updatedRatings = {
					ratings
				};
				this.props.updateMovie(movieId, updatedRatings);
			}
		);
	}

	// Triggers an edit ratings mode

	handleEditRating() {
		this.setState(prevState => ({
			editRatings: !prevState.editRatings
		}));
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	// Handle the submission of the form (in this case it is a comment)

	handleSubmit(event) {
		const movieId = this.props.match.params.id;
		event.preventDefault();
		this.setState({
			user: event.target.value,
			content: event.target.value
		});
		const { user, content } = this.state;
		const newComment = {
			movieId,
			user,
			content
		};
		this.props.addComment(movieId, newComment);
		this.setState({
			user: '',
			content: ''
		});
	}

	renderComments(comments) {
		if (!comments) {
			return <Spinner style={{ width: '3rem', height: '3rem' }} />;
		}

		return comments.map(comment => {
			const { user, content, id } = comment;
			return (
				<ListGroupItem key={id}>
					<ListGroupItemHeading>
						Username: {user}
					</ListGroupItemHeading>
					<ListGroupItemText>{content}</ListGroupItemText>
				</ListGroupItem>
			);
		});
	}

	render() {
		const { movie } = this.props;
		const { ratings, editRatings } = this.state;
		if (!movie) {
			return (
				<Spinner
					type="grow"
					color="success"
					style={{ width: '3rem', height: '3rem' }}
				/>
			);
		}
		const { title, year, poster, plot, comments } = movie;
		return (
			<Container className="my-5">
				<Row>
					<Col xl="6" md="6" sm="5">
						<div>
							<Card>
								<CardImg top width="100%" src={poster} />
								<CardBody>
									<div className="mb-2 text-center">
										<div>
											<Button
												color="info"
												className="mt-3"
												onClick={this.handleEditRating}
											>
												Edit Rating
											</Button>
										</div>
										<div>
											{editRatings ? (
												<div>
													<h2>Rating: {ratings}</h2>
													<StarRatingComponent
														name="ratings"
														starCount={10}
														value={ratings}
														renderStarIcon={() => (
															<span className="oi oi-star" />
														)}
														onStarClick={
															this
																.handleRatingsClick
														}
													/>
												</div>
											) : (
												<div>
													<h2>
														Rating: {movie.ratings}
													</h2>
													<StarRatingComponent
														name="ratings"
														editing={false}
														starCount={10}
														value={movie.ratings}
														renderStarIcon={() => (
															<span className="oi oi-star" />
														)}
													/>
												</div>
											)}
										</div>
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
								</CardBody>
							</Card>
						</div>
					</Col>
					<Col xl="6" md="6" sm="7">
						<ListGroup>
							<ListGroupItem active>
								<ListGroupItemHeading>
									Comments
								</ListGroupItemHeading>
							</ListGroupItem>
							{this.renderComments(comments)}
						</ListGroup>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup row>
								<Input
									required
									type="text"
									name="user"
									id="exampleEmail"
									placeholder="Please enter your name"
									className="mb-3"
									value={this.state.user}
									onChange={this.handleChange}
								/>
								<Input
									required
									type="textarea"
									name="content"
									bsSize="lg"
									placeholder="Add a comment"
									value={this.state.content}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<Button
								color="success"
								className="mt-3 float-right"
							>
								Submit!
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		movie: state.selectedMovie
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getMovie: id => dispatch(fetchSingleMovie(id)),
		addComment: (id, comment) => dispatch(createComment(id, comment)),
		updateMovie: (id, ratings) => dispatch(updatedMovie(id, ratings))
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Movie)
);
