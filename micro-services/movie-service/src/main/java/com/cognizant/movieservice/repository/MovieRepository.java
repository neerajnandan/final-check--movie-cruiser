package com.cognizant.movieservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cognizant.movieservice.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
	Movie findById(int id);
	
	@Query(value="select * from movie where mv_active=true and mv_date_of_launch<=CURDATE()",nativeQuery=true)
	List<Movie> getMovieListCustomerList();

}
