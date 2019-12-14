package com.cognizant.moviecruiser.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cognizant.moviecruiser.model.Movie;

@Repository
public interface MovieDao {
	public List<Movie> getMovieListAdmin();

	public List<Movie> getMovieListCustomer();

	public boolean modifyMovie(Movie movie);

	public Movie getMovie(Long movieId);
}
