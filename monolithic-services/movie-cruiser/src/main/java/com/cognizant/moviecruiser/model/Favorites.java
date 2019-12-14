package com.cognizant.moviecruiser.model;

import java.util.ArrayList;
import java.util.List;

public class Favorites {
	private List<Movie> favoritesItems = new ArrayList<Movie>();
	private int noOfFavorites;

	public Favorites() {
		super();
	}

	public List<Movie> getFavoritesItems() {
		return favoritesItems;
	}

	public void setFavoritesItems(List<Movie> favoritesItems) {
		this.favoritesItems = favoritesItems;
	}

	public Favorites(List<Movie> favoritesItems, int noOfFavorites) {
		super();
		this.favoritesItems = favoritesItems;
		this.noOfFavorites = noOfFavorites;
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
