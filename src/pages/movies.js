import facade from "../authenticationFacade";
import React, { useState, useEffect } from "react";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		facade.fetchData("/api/movies").then((data) => setMovies(data));
	}, []);
	return (
		<div className="container">
			<MovieList movies={movies} />
		</div>
	);
};

const MovieList = ({ movies }) => {
	return (
		<>
			<div className="row">
				{movies.map((movie) => (
					<Movie movie={movie} />
				))}
			</div>
		</>
	);
};

const Movie = ({ movie }) => {
	return (
		<div className="col-4">
			<img src={movie.Poster} />
			<h3 style={{ display: "flex", alignItems: "center" }}>
				<span style={{ marginRight: "10px" }}>{movie.imdbRating}⭐</span>
				{movie.Title}
			</h3>
			<p>{movie.Plot}</p>
		</div>
	);
};

export default Movies;
