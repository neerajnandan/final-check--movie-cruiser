package com.cognizant.movieservice.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.movieservice.dto.FavoritesDTO;
import com.cognizant.movieservice.exception.FavoritesEmptyException;
import com.cognizant.movieservice.model.Movie;
import com.cognizant.movieservice.model.User;
import com.cognizant.movieservice.repository.MovieRepository;
import com.cognizant.movieservice.repository.UserRepository;

@Service
public class FavoritesService {
	
private static final Logger LOGGER = LoggerFactory.getLogger(FavoritesService.class);
	
	
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	MovieRepository movieRepository;
	
	@Transactional
	public boolean addFavoritesItem(String username,int id){
		User user = userRepository.findByUsername(username);
		Movie movie = movieRepository.findById(id);
		user.getMovie().add(movie);
		userRepository.save(user);
		return true;
	}
	@Transactional
	public void deleteFavoritesItem(String username,int id){
		User user = userRepository.findByUsername(username);
		Movie movie = movieRepository.findById(id);
		List<Movie> movieList = user.getMovie();
		movieList.remove(movie);
		user.setMovie(movieList);
		userRepository.save(user);
	}
	
	@Transactional
	public FavoritesDTO getAllFavoritesItems(String username) throws FavoritesEmptyException{
		FavoritesDTO favoritesDTO;
		List<Movie> MovieList = userRepository.getMovie(username);
		if(MovieList==null || MovieList.size()==0){
			return new FavoritesDTO (new ArrayList(),0);
		}else{
			favoritesDTO = new FavoritesDTO();
			favoritesDTO.setFavoritesItems(MovieList);
			favoritesDTO.setNoOfFavorites(MovieList.size());
		}
		return favoritesDTO;
	}
	
/*	@Autowired
	FavoritesDao favoritesDao;
	
	public boolean addFavoritesItem(String userId, long menuItemId) {
		return favoritesDao.addFavorites(userId, menuItemId);
	}

	public Favorites getAllFavoritesItems(String userId) {
		// TODO Auto-generated method stub
		try {
			if(favoritesDao.getAllFavorites(userId)!=null)
			return favoritesDao.getAllFavorites(userId);
			else
				return new Favorites(new ArrayList<Movie>(),0);
				
		} catch (FavoritesEmptyException e) {
			return new Favorites(new ArrayList<Movie>(),0);
		}
	}



	public void deleteFavoritesItem(String userId, Long menuItemId) {
		// TODO Auto-generated method stub
		favoritesDao.removeFavorites(userId, menuItemId);
		
	}
*/


}