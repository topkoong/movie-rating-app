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
