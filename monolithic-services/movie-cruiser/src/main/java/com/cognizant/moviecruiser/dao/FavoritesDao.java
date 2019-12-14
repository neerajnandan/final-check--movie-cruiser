package com.cognizant.moviecruiser.dao;

import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesDao {
	public boolean addFavorites(String userId, long movieId);

	public void removeFavorites(String userId, long movieId);
}
