package com.cognizant.authenticationservice.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.authenticationservice.exception.UserAlreadyExistsException;
import com.cognizant.authenticationservice.model.User;
import com.cognizant.authenticationservice.security.AppUserDetailsService;


@RestController
@RequestMapping("/users") 
public class UserController {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	AppUserDetailsService appUserDetailsService;

	
	
	@PostMapping
	public void signup(@RequestBody @Valid User newUser) throws UserAlreadyExistsException {
		
		appUserDetailsService.signup(newUser);
		
	}


}
