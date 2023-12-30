package org.backend.hackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class RjPoliceHackathonApplication {

    public static void main(String[] args) {
        SpringApplication.run(RjPoliceHackathonApplication.class, args);
    }

}
