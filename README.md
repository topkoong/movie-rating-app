# A movie rating app


## Setup

**Fork** and clone this repository to your machine. https://github.com/topkoong/movie-rating-app 

Make sure that you have `Node` and `PostGreSQL` installed on your local machine. 

### Installing Node

Download the Node.js source code or a pre-built installer for your platform
https://nodejs.org/en/download/

### Installing postgres
If you're on a Mac, you can head right over to http://postgresapp.com/ and follow the instructions there to get a full-featured installation of postgres, including the psql command line tool. Be sure to follow the set up your $PATH link and follow the instructions there.

Now run the following commands to set up your working directory.

```bash
createdb movie-rating

npm install
```
Then execute the following to run the app on your local machine:

## Getting started
```bash

npm run start-dev
```

## How to search a movie?

A Text field is designed for the user to enter search queries into.

User can type a `movie title` into an input text field press enter on input text field to query http://www.omdbapi.com/​ for a movie.

Then, the page will display the movie with relevant data such as poster, title, year, and plot (or a placeholder image if there is no poster)


## How to add a movie to your favorite list

After user query a movie, user is able to click an `Add this movie to my favorite list` button

## How to edit movie ratings and add comments?

User can click a `view` button and then click an `edit` button so that he/she can edit/change the movie's rating.

Below `comment` sections, user can also enter a name and content when writing a movie review.

### Backend

- [x] Write a `movie` model with the following information:
  - [x] title - not empty or null
  - [x] plot - text
  - [x] year - with a default value
  - [x] poster - with a default value
  - [x] imdbId - String
  - [x] ratings - integer between 0 and 10

- [x] Write a `comment` model with the following information:
  - [x] user - not empty or null
  - [x] content - text
- [x] Comments may be associated with at most one movie. Likewise, movies may be associated with many comments.

- [x] Write a route to serve up all movies
- [x] Write a route to serve up a single movie (based on its id), _including that movies' comments_
- [x] Write a route to search for a specific movie or create it if not available
- [x] Write a route to add a new comment
- [x] Write a route to remove a movie (based on its id)
- [x] Write a route to update existing movie's ratings (based on its id)

### Frontend
- [x] Write a movies sub-reducer to manage movies, comments, and ratings in my Redux store
- [x] Write a component to display a single movie that fetches from OMDB API with the following information.
    - [x] The movie's title, plot, year, poster. (or a placeholder image if an image URL is broken)
    - [x] A button that adds a fetched movie to user's favorite movie's list.
- [x] Write a component to display a list of all movies (title, plot, year, poster, and ratings) (or a placeholder image if an image URL is broken or a helpful message if it doesn't have any favorite movies)
- [x] Write a component to display a single movie that can be edited (Ratings)
- [x] Display the all-favorite movies component when the url matches `/favorites`
- [x] Display the appropriate movie's info when the url matches `/favorites/:movieId`
- [x] Add links to the navbar that can be used to navigate to the all-favorite movies view, single movie view, and home.
- [x] Write a component to display a form for adding a new comment that contains inputs for _at least_ the user and content.
- [x] Display this component EITHER as part of the single movie view, or as its own view
- [x] Submitting the form with a user and content should:
  - [x] Make an AJAX request that causes the new comment to be persisted in the database
  - [x] Add the new comment to the list of comments without needing to refresh the page
- [x] In the all-favorite movies view, include an `Remove` button next to each movie
- [x] Clicking the `Remove` button should:
  - [x] Make an AJAX request that causes that movie to be removed from database
  - [x] Remove the movie from the list of favorite movies without needing to refresh the page
- [x] Whenever a component needs to wait for data to load from the server, a Spinner component should be displayed until the data is available
