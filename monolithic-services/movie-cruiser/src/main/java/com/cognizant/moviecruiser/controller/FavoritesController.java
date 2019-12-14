package com.cognizant.moviecruiser.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.moviecruiser.MovieCruiserApplication;
import com.cognizant.moviecruiser.dto.FavoritesDTO;
import com.cognizant.moviecruiser.exception.FavoritesEmptyException;
import com.cognizant.moviecruiser.service.FavoritesService;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {
	private static final Logger LOGGER = LoggerFactory.getLogger(MovieCruiserApplication.class);

	@Autowired
	FavoritesService favoritesService;

	@PostMapping("/{userId}/{movieId}")
	public boolean addFavoritesItem(@PathVariable String userId, @PathVariable int movieId) {
		System.out.println("userid" + userId);
		System.out.println("movieId" + movieId);

		return favoritesService.addFavoritesItem(userId, movieId);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<FavoritesDTO> getAllFavoritesItems(@PathVariable String userId)
			throws FavoritesEmptyException {
		return new ResponseEntity<FavoritesDTO>(favoritesService.getAllFavoritesItems(userId), HttpStatus.OK);
	}

	@DeleteMapping("/{userId}/{movieId}")
	public boolean deleteFavoritesItem(@PathVariable String userId, @PathVariable int movieId) {
		System.out.println("delete mapping");
		System.out.println("userid" + userId);
		System.out.println("movieId" + movieId);
		favoritesService.deleteFavoritesItem(userId, movieId);
		return true;
	}

}
