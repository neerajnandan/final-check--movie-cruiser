package com.cognizant.moviecruiser.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cognizant.moviecruiser.model.Movie;
import com.cognizant.moviecruiser.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("SELECT u FROM User u where u.username=?1")
	User findByUsername(String username);

	@Query("Select u.Movie from User u WHERE u.username=?1")
	List<Movie> getMovie(String username);

}
