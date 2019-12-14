package com.cognizant.moviecruiser.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.moviecruiser.dto.FavoritesDTO;
import com.cognizant.moviecruiser.exception.FavoritesEmptyException;
import com.cognizant.moviecruiser.model.Movie;
import com.cognizant.moviecruiser.model.User;
import com.cognizant.moviecruiser.repository.MovieRepository;
import com.cognizant.moviecruiser.repository.UserRepository;

@Service
public class FavoritesService {

	private static final Logger LOGGER = LoggerFactory.getLogger(FavoritesService.class);

	@Autowired
	UserRepository userRepository;

	@Autowired
	MovieRepository movieRepository;

	@Transactional
	public boolean addFavoritesItem(String username, int id) {
		User user = userRepository.findByUsername(username);
		Movie movie = movieRepository.findById(id);
		user.getMovie().add(movie);
		userRepository.save(user);
		return true;
	}

	@Transactional
	public void deleteFavoritesItem(String username, int id) {
		User user = userRepository.findByUsername(username);
		Movie movie = movieRepository.findById(id);
		List<Movie> movieList = user.getMovie();
		movieList.remove(movie);
		user.setMovie(movieList);
		userRepository.save(user);
	}

	@Transactional
	public FavoritesDTO getAllFavoritesItems(String username) throws FavoritesEmptyException {
		FavoritesDTO favoritesDTO;
		List<Movie> MovieList = userRepository.getMovie(username);
		if (MovieList == null || MovieList.size() == 0) {
			return new FavoritesDTO(new ArrayList(), 0);
		} else {
			favoritesDTO = new FavoritesDTO();
			favoritesDTO.setFavoritesItems(MovieList);
			favoritesDTO.setNoOfFavorites(MovieList.size());
		}
		return favoritesDTO;
	}

}
