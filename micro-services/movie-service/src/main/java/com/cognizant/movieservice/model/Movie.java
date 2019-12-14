package com.cognizant.movieservice.model;

import java.util.Date;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="movie")
public class Movie {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="mv_id")
	private int id;
	@Column(name="mv_title")
	private String title; 
	@Column(name="mv_box_office")
	private long boxOffice;

	@Column(name="mv_active")
	private boolean active;
	@Column(name="mv_date_of_launch")
	private Date dateOfLaunch;
	@Column(name="mv_genre")
	private String genre;
	@Column(name="mv_has_teaser")
	private boolean hasTeaser;
	@Column(name="mv_image_url")
	private String imageUrl;
	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
	}



	public long getBoxOffice() {
		return boxOffice;
	}



	public void setBoxOffice(long boxOffice) {
		this.boxOffice = boxOffice;
	}



	public boolean isActive() {
		return active;
	}



	public void setActive(boolean active) {
		this.active = active;
	}



	public Date getDateOfLaunch() {
		return dateOfLaunch;
	}



	public void setDateOfLaunch(Date dateOfLaunch) {
		this.dateOfLaunch = dateOfLaunch;
	}



	public String getGenre() {
		return genre;
	}



	public void setGenre(String genre) {
		this.genre = genre;
	}



	public boolean isHasTeaser() {
		return hasTeaser;
	}



	public void setHasTeaser(boolean hasTeaser) {
		this.hasTeaser = hasTeaser;
	}



	public String getImageUrl() {
		return imageUrl;
	}



	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}






	@Override
	public String toString() {
		return "Movie [id=" + id + ", title=" + title + ", boxOffice=" + boxOffice + ", active=" + active
				+ ", dateOfLaunch=" + dateOfLaunch + ", genre=" + genre + ", hasTeaser=" + hasTeaser + ", imageUrl="
				+ imageUrl + "]";
	}



	public Movie() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Movie(int id, String title, long boxOffice, boolean active, Date dateOfLaunch, String genre,
			boolean hasTeaser, String imageUrl) {
		super();
		this.id = id;
		this.title = title;
		this.boxOffice = boxOffice;
		this.active = active;
		this.dateOfLaunch = dateOfLaunch;
		this.genre = genre;
		this.hasTeaser = hasTeaser;
		this.imageUrl = imageUrl;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Movie other = (Movie) obj;
		if (id != other.id)
			return false;
		return true;
	}

}