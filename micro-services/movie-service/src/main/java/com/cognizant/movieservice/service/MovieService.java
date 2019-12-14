package com.cognizant.movieservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.movieservice.model.Movie;
import com.cognizant.movieservice.repository.MovieRepository;

@Service
public class MovieService {
	
	
	@Autowired
	MovieRepository movieRepository;
	
	public List<Movie> getMovieListCustomer(){
		
		return movieRepository.getMovieListCustomerList();
	}


	public List<Movie> getMovieListAdmin() {
		return movieRepository.findAll();
	}


	public Movie getMovie(int id) {

		return movieRepository.findById(id);
	}


	public Movie modifyMovie(Movie movie) {
		// TODO Auto-generated method stub
		return movieRepository.save(movie);
	}

}