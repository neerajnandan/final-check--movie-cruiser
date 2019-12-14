package com.cognizant.moviecruiser.dto;

import java.util.ArrayList;
import java.util.List;

import com.cognizant.moviecruiser.model.Movie;

public class FavoritesDTO {
	private List<Movie> favoritesItems = new ArrayList<Movie>();
	private int noOfFavorites;

	public FavoritesDTO() {
		super();
	}

	public FavoritesDTO(List<Movie> favoritesItems, int noOfFavorites) {
		super();
		this.favoritesItems = favoritesItems;
		this.noOfFavorites = noOfFavorites;
	}

	public List<Movie> getFavoritesItems() {
		return favoritesItems;
	}

	public void setFavoritesItems(List<Movie> favoritesItems) {
		this.favoritesItems = favoritesItems;
	}

	public int getNoOfFavorites() {
		return noOfFavorites;
	}

	public void setNoOfFavorites(int noOfFavorites) {
		this.noOfFavorites = noOfFavorites;
	}

	@Override
	public String toString() {
		return "Favorites [favoritesItems=" + favoritesItems + ", noOfFavorites=" + noOfFavorites + "]";
	}

}
