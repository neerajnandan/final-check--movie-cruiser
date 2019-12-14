package com.cognizant.movieservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.movieservice.model.Movie;
import com.cognizant.movieservice.security.AppUserDetailsService;
import com.cognizant.movieservice.service.MovieService;

@RestController
@RequestMapping("/movies")
public class MovieController {
	
	@Autowired
	MovieService movieService;
	
	@Autowired
	InMemoryUserDetailsManager inMemoryUserDetailsManager;
	
	@Autowired
	AppUserDetailsService appUserDetailsService;

	
	@GetMapping
	public ResponseEntity<List<Movie>> getAllMovies() {

				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				String user = authentication.getName();
				if(!user.equalsIgnoreCase("anonymoususer")){
					UserDetails userDetails = appUserDetailsService.loadUserByUsername(user);
					String role = userDetails.getAuthorities().toArray()[0].toString();
					System.out.println("role is "+role);
					if(role.equals("USER"))
						return new ResponseEntity<List<Movie>>(movieService.getMovieListCustomer(),HttpStatus.OK);
					else 
					if(role.equals("ADMIN"))
						return new ResponseEntity<List<Movie>>(movieService.getMovieListAdmin(),HttpStatus.OK);
				}
				return new ResponseEntity<List<Movie>>(movieService.getMovieListCustomer(),HttpStatus.OK);
	}
	
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Movie> getMovie(@PathVariable int id) {
		
		return new ResponseEntity<Movie>(movieService.getMovie(id),HttpStatus.OK);

	}
	
	@PutMapping
	public ResponseEntity<Movie> modifyMovie(@RequestBody Movie movie) {
		
		return new ResponseEntity<Movie>(movieService.modifyMovie(movie),HttpStatus.OK);
		
	}

}
