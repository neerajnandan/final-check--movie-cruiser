package com.cognizant.moviecruiser.dao;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

import com.cognizant.moviecruiser.model.Movie;

@Repository
public class MovieDaoCollectionImpl implements MovieDao {

	static ApplicationContext context = new ClassPathXmlApplicationContext("movie.xml");

	private static List<Movie> movieList;

	public MovieDaoCollectionImpl() {
		if (movieList == null) {
			movieList = (ArrayList<Movie>) context.getBean("movieList", ArrayList.class);
		}
	}

	@Override
	public List<Movie> getMovieListAdmin() {
		// TODO Auto-generated method stub
		return movieList;
	}

	@Override
	public List<Movie> getMovieListCustomer() {
		List<Movie> movieListCustomer = new ArrayList<Movie>();
		Date today = Calendar.getInstance().getTime();
		for (Movie movie : getMovieListAdmin()) {

			if ((movie.getDateOfLaunch().before(today)) || (movie.getDateOfLaunch().equals(today))) {
				if (movie.isActive()) {
					movieListCustomer.add(movie);
				}
			}
		}
		return movieListCustomer;
	}

	@Override
	public boolean modifyMovie(Movie movie) {
		for (int i = 0; i < movieList.size(); i++) {
			if (movie.equals(movieList.get(i))) {
				movieList.set(i, movie);
				return true;
			}
		}
		return false;
	}

	@Override
	public Movie getMovie(Long movieId) {
		for (int i = 0; i < movieList.size(); i++) {
			if (movieId == movieList.get(i).getId()) {
				return movieList.get(i);
			}
		}
		return null;
	}
}