package com.cognizant.movieservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cognizant.movieservice.model.Movie;
import com.cognizant.movieservice.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("SELECT u FROM User u where u.username=?1")
	User findByUsername(String username);
	
	@Query("Select u.Movie from User u WHERE u.username=?1")
	List<Movie> getMovie(String username);

//	@Query("Select count(*)  from movie where mo_id in(select fv_pr_id")
//	int getnooffavorites(String username);
	
	/* @Query(value = "select count(mv_price) from menu_item where me_id in(select ct_pr_id from cart where ct_us_id=(select us_id from user where us_username= :username))", nativeQuery = true)
	    public double getnoOfFavorites(@Param(value = "username") String username);
*/
	
}
