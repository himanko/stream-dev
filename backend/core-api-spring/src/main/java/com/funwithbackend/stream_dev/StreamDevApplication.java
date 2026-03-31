package com.funwithbackend.stream_dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync // 🚀 Turns on background thread capabilities
@SpringBootApplication
public class StreamDevApplication {

	public static void main(String[] args) {
		SpringApplication.run(StreamDevApplication.class, args);
	}

}


