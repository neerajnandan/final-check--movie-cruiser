package com.cognizant.authenticationservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cognizant.authenticationservice.model.Movie;
import com.cognizant.authenticationservice.model.User;

public interface UserRepository extends CrudRepository<User, Integer>{

	
	@Query("SELECT u FROM User u where u.username=?1")
	User findByUsername(String username);
	
	@Query("Select u.Movie from User u WHERE u.username=?1")
	List<Movie> getMovie(String username);



}
