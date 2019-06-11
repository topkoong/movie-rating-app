import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Form,
	Input,
	InputGroup,
	Progress
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { createMovie } from '../store';
import { withRouter } from 'react-router-dom';

const fixedWidth = {
	width: '600px'
};

const API_KEY = process.env.OMDB_API_KEY;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieTitle: '',
			movie: {}
		};
		this.addDefaultSrc = this.addDefaultSrc.bind(this);
		this.handleMovieTitleChange = this.handleMovieTitleChange.bind(this);
		this.handleMovieTitleSubmit = this.handleMovieTitleSubmit.bind(this);
		this.addMovieToFavoriteList = this.addMovieToFavoriteList.bind(this);
	}
	async componentDidMount() {
		const { data } = await axios.get(
			`https://www.omdbapi.com/?apikey=${API_KEY}&t=Captain America&plot=full&r=json`
		);

		this.setState({ movie: data });
	}
	addDefaultSrc(ev) {
		ev.target.src =
			'https://stainedglassbnb.com/wp-content/uploads/2016/09/placeholder-625x375.jpg';
	}
	handleMovieTitleChange(event) {
		this.setState({
			movieTitle: event.target.value
		});
	}
	async handleMovieTitleSubmit(event) {
		event.preventDefault();
		this.setState({ movieTitle: event.target.value });
		const { data } = await axios.get(
			`https://www.omdbapi.com/?apikey=${API_KEY}&t=${
				this.state.movieTitle
			}&plot=full&r=json`
		);
		this.setState({
			movieTitle: '',
			movie: data
		});
	}

	addMovieToFavoriteList() {
		const { Title, Year, Poster, Plot, imdbID } = this.state.movie;
		const newMovie = {
			title: Title,
			year: Year,
			poster: Poster,
			plot: Plot,
			imdbId: imdbID
		};
		this.props.addMovie(newMovie, this.props.history);
	}

	render() {
		const movie = this.state.movie;
		const { Title, Year, Poster, Plot } = movie;
		if (!movie) {
			return (
				<Progress
					animated
					value={2 * 5}
					style={{ width: '3rem', height: '3rem' }}
				/>
			);
		}
		return (
			<Container>
				<Col md={12} sm={12} xs={12}>
					<Form onSubmit={this.handleMovieTitleSubmit}>
						<Row>
							<InputGroup
								row
								className="my-5 mx-auto"
								style={fixedWidth}
							>
								<Input
									size="lg"
									required
									onChange={this.handleMovieTitleChange}
									placeholder="movie title"
									value={this.state.movieTitle || ''}
								/>
								<Button color="danger" className="mx-2">
									Search
								</Button>
							</InputGroup>
						</Row>
					</Form>
				</Col>
				<Row>
					<Col xs="12">
						<div>
							<Card>
								<div className="text-center">
									<img
										onError={this.addDefaultSrc}
										src={Poster}
										alt="Responsive image"
										className="img-fluid"
									/>
								</div>
								<CardBody>
									<CardTitle>
										<b>Title:</b> {Title}
									</CardTitle>
									<CardSubtitle>
										<b>Year:</b> {Year}
									</CardSubtitle>
									<CardText>
										<b>Plot:</b> {Plot}
									</CardText>
									<Button
										onClick={this.addMovieToFavoriteList}
									>
										Add this movie to my favorite list
									</Button>
								</CardBody>
							</Card>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addMovie: (movie, history) => dispatch(createMovie(movie, history))
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(Home)
);
