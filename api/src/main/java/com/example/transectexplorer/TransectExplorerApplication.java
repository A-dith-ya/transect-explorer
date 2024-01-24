package com.example.transectexplorer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TransectExplorerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TransectExplorerApplication.class, args);
	}

}
