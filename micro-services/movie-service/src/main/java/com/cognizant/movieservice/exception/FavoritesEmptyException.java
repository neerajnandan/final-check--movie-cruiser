package com.cognizant.movieservice.exception;

public class FavoritesEmptyException extends Exception {
	public FavoritesEmptyException() {
		super("Favorites is Empty");
	}
}

